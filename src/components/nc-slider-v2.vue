<template>
  <div class="nc-slider" :class="{'nc-slider--disabled': isDisabled}">
    <div
        class="nc-slider__container"
        ref="nc-slider__container"
        @click="clickTrack"
    >
      <img :src="dragDot" class="nc-slider__drag-dot-placeholder">
      <div class="nc-slider__total-track"></div>
      <div
          class="nc-slider__selected-track"
          :style="{
            'left': `${trackSize * floorRelativePosition}px`,
            'right': `${trackSize - (trackSize * ceilRelativePosition)}px`
          }"
        ></div>
      <span
          v-if="isDouble"
          class="nc-slider__trigger nc-slider__trigger--min"
          draggable="true"
          :style="{ 'left': `${trackSize * floorRelativePosition}px` }"
          @dragstart="dragStartHandler"
          @drag="dragHandler"
          @dragend="dragEndHandler"
          @touchstart="touchStartHandler"
          @touchmove="touchMoveHandler"
          @touchend="dragEndHandler"
      ></span>
      <span
          draggable="true"
          class="nc-slider__trigger nc-slider__trigger--max"
          :style="{ 'left': `${trackSize * ceilRelativePosition}px` }"
          @dragstart="dragStartHandler"
          @drag="dragHandler"
          @dragend="dragEndHandler"
          @touchstart="touchStartHandler"
          @touchmove="touchMoveHandler"
          @touchend="dragEndHandler"
      ></span>
    </div>
    <div class="nc-slider__label nc-slider__label--min">{{floorLabel}}</div>
    <div class="nc-slider__label nc-slider__label--max">{{ceilLabel}}</div>
  </div>
</template>

<script>
export default {
  name: 'NcSliderV2',
  data() {
    return {
      dragDot: require('../assets/png/dragDot.png'),
      isDragging: false,
      isFloorTrigger: false,
      floorRelativePosition: 0,
      ceilRelativePosition: 1,
      trackSize: 0,
      trackLeftPosition: 0,
      dragX: 0
    }
  },
  props: {
    isDouble: {
      type: Boolean,
      default: false
    },
    floorLabel: {
      type: String,
      default: ' '
    },
    floorValue: {
      type: Number,
      default: 0
    },
    minValue: {
      type: Number,
      default: 0
    },
    ceilLabel: {
      type: String,
      default: ' '
    },
    ceilValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 100
    },
    sliderMinGap: {
      type: Number,
      default: 0.02
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _floorValue() {
      return this.isDouble
        ? Math.round(
            (this.maxValue - this.minValue) * this.floorRelativePosition
          ) + this.minValue
        : this.minValue
    },
    _ceilValue() {
      return (
        Math.round(
          (this.maxValue - this.minValue) * this.ceilRelativePosition
        ) + this.minValue
      )
    }
  },
  watch: {
    ceilValue() {
      this.calculateInitialCeilRelativePosition()
    },
    floorValue() {
      this.calculateInitialFloorRelativePosition()
    }
  },
  methods: {
    calculateInitialCeilRelativePosition() {
      this.ceilRelativePosition =
        this.maxValue >= this.ceilValue
          ? (this.ceilValue - this.minValue) / (this.maxValue - this.minValue)
          : 1
    },
    calculateInitialFloorRelativePosition() {
      this.floorRelativePosition =
        this.minValue <= this.floorValue && this.isDouble
          ? (this.floorValue - this.minValue) / (this.maxValue - this.minValue)
          : 0
    },
    setFloorTriggerPosition(dragOffset, dragPosition) {
      const ceil = this.ceilRelativePosition - this.sliderMinGap
      this.floorRelativePosition =
        dragPosition > 0 ? (dragPosition < ceil ? dragPosition : ceil) : 0
    },
    setCeilTriggerPosition(dragOffset, dragPosition) {
      const floor =
        this.floorRelativePosition + (this.isDouble ? this.sliderMinGap : 0)
      this.ceilRelativePosition =
        dragPosition > floor ? (dragPosition < 1 ? dragPosition : 1) : floor
    },
    resizeHandler() {
      this.trackSize = this.$refs['nc-slider__container'].offsetWidth
      this.trackLeftPosition = this.$refs[
        'nc-slider__container'
      ].getBoundingClientRect().left
    },
    dragStartHandler(e) {
      this.isDragging = true
      e.dataTransfer.setData('application/node type', this)
      const dragImg = new Image()
      dragImg.src = this.dragDot
      e.dataTransfer.setDragImage(dragImg, 0, 0)
      e.dataTransfer.setData('text', '_')
      e.dataTransfer.effectAllowed = 'move'
    },
    dragOverHandler(e) {
      ;(e.dataTransfer || {}).dropEffect = 'move'
      if (e.clientX && this.dragX !== e.clientX && this.isDragging) {
        this.dragX = e.clientX
        const dragOffset = e.clientX - this.trackLeftPosition
        const dragPosition = dragOffset / this.trackSize
        if (this.isFloorTrigger) {
          this.setFloorTriggerPosition(dragOffset, dragPosition)
        } else {
          this.setCeilTriggerPosition(dragOffset, dragPosition)
        }
      }
    },
    touchStartHandler() {
      this.isDragging = true
      // test
    },
    touchMoveHandler(e) {
      this.isFloorTrigger = e.target.classList.contains(
        'nc-slider__trigger--min'
      )
      this.dragOverHandler(e.targetTouches[0])
    },
    dragHandler(e) {
      this.isFloorTrigger = e.target.classList.contains(
        'nc-slider__trigger--min'
      )
    },
    dragEndHandler() {
      this.isDragging = false
      this.$emit('change', [this._floorValue, this._ceilValue])
    },
    clickTrack(e) {
      const clickOffset = e.clientX - this.trackLeftPosition
      const clickPosition = clickOffset / this.trackSize
      let methodName
      if (this.isDouble) {
        const distanceToCeil = Math.abs(this.ceilRelativePosition - clickPosition)
        const distanceToFloor = Math.abs(this.floorRelativePosition - clickPosition)
        this.isFloorTrigger = distanceToFloor < distanceToCeil
        methodName = this.isFloorTrigger ? 'setFloorTriggerPosition' : 'setCeilTriggerPosition'
      } else {
        this.isFloorTrigger = false
        methodName = 'setCeilTriggerPosition'
      }
      this[methodName](clickOffset, clickPosition)
      this.$emit('change', [this._floorValue, this._ceilValue])
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
    document.addEventListener('dragover', this.dragOverHandler)
    this.resizeHandler()
    this.calculateInitialCeilRelativePosition()
    this.calculateInitialFloorRelativePosition()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('dragover', this.dragOverHandler)
  }
}
</script>

<style scoped lang="scss">
$color-coral: #fa5a5a;
$color-stone: #d8d8d8;
$color-white: #ffffff;
$color-gray:  #aaaaaa;
$triggerBorder: 3;
$triggerSize: 18;
$triggerBounds: (2 * $triggerBorder) + $triggerSize;

.nc-slider {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 ($triggerBounds / 2) + 0px;
  width: 100%;

  $slider: &;
  &--disabled{
    pointer-events: none;
    #{$slider}__selected{
      &-track{
        background-color: $color-gray;
      }
    }
    #{$slider}__trigger{
      border-color: $color-gray;
    }
  }

  &__container {
    height: $triggerBounds + 0px;
    position: relative;
    width: 100%;
  }

  &__drag-dot-placeholder {
    bottom: 100%;
    height: 1px;
    position: absolute;
    right: 100%;
    width: 1px;
  }

  &__total-track,
  &__selected-track {
    bottom: 0;
    height: $triggerBorder + 1px;
    left: 0;
    margin: auto;
    position: absolute;
    top: 0;
  }

  &__total-track {
    background-color: $color-stone;
    right: 0;
  }

  &__selected-track {
    background-color: $color-coral;
  }

  &__trigger {
    background-color: $color-white;
    border: $triggerBorder + 0px solid $color-coral;
    bottom: 0;
    border-radius: 50%;
    cursor: pointer;
    height: $triggerSize + 0px;
    margin: auto 0 auto -1 * ($triggerBounds / 2) + 0px;
    outline: 0;
    position: absolute;
    top: 0;
    width: $triggerSize + 0px;
  }

  &__label {
    color: #272727;
    font-family: 'Circular-Book', sans-serif;
    font-size: 12px;
    margin-top: 8px;
    min-width: 1px;
  }
}
</style>
