<template>
  <div class="nc-slider" :class="{'nc-slider--disabled': isDisabled}">
    <img :src="dragDot" class="nc-slider__drag-dot-placeholder">
    <div
        class="nc-slider__container"
        ref="nc-slider__container"
        @click="clickTrack"
    >
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
      ceilLabel: {
        type: String,
        default: ' '
      },
      ceilValue: {
        type: Number,
        default: 0
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      availableSteps: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      _floorValue() {
        const idx = this.stepConfig.percentages.findIndex(percentage => percentage === this.floorRelativePosition)
        return this.stepConfig.values[this.isDouble ? idx : 0]
      },
      _ceilValue() {
        const idx = this.stepConfig.percentages.findIndex(percentage => percentage === this.ceilRelativePosition)
        return this.stepConfig.values[idx]
      },
      stepConfig() {
        const total = this.availableSteps.length
        const config = this.availableSteps.reduce((acc, step, idx) => {
          acc.values.push(step)
          acc.percentages.push(idx / (total - 1))
          return acc
        }, {
          values: [],
          percentages: [],
          total
        } )
        return config
      },
      _sliderMinGap() {
        return 1 / this.stepConfig.total
      }
    },
    watch: {
      ceilValue() {
        if (!this.isDragging) {
          this.calculateInitialCeilRelativePosition()
        }
      },
      floorValue() {
        if (!this.isDragging) {
          this.calculateInitialFloorRelativePosition()
        }
      }
    },
    methods: {
      calculateInitialCeilRelativePosition() {
        const idx = this.stepConfig.values.findIndex(value => value === this.ceilValue)
        this.ceilRelativePosition = this.stepConfig.percentages[idx >= 0 ? idx : this.stepConfig.percentages.length - 1]
      },
      calculateInitialFloorRelativePosition() {
        const idx = this.stepConfig.values.findIndex(value => value === this.floorValue)
        this.floorRelativePosition = this.stepConfig.percentages[idx >= 0 ? idx : 0]
      },
      getValidPosition(position) {
        let diff = 1
        let validStep = 0
        for (let i = 0; i < this.stepConfig.total; i++) {
          const _diff = Math.abs(this.stepConfig.percentages[i] - position)
          if (_diff > diff) {
            i = this.stepConfig.total
          } else {
            diff = _diff
            validStep = i
          }
        }
        return this.stepConfig.percentages[validStep]
      },
      setFloorTriggerPosition(dragOffset, dragPosition) {
        const ceil = this.getValidPosition(this.ceilRelativePosition - this._sliderMinGap)
        this.floorRelativePosition =
          dragPosition > 0 ? (dragPosition < ceil ? this.getValidPosition(dragPosition) : ceil) : 0
        this.$emit('drag', [this._floorValue, this._ceilValue])
      },
      setCeilTriggerPosition(dragOffset, dragPosition) {
        const floor = this.getValidPosition(this.floorRelativePosition + (this.isDouble ? this._sliderMinGap : 0))
        this.ceilRelativePosition =
          dragPosition > floor
            ? (dragPosition < 1
              ? this.getValidPosition(dragPosition)
              : 1)
            : floor
        this.$emit('drag', [this._floorValue, this._ceilValue])
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
        (e.dataTransfer || {}).dropEffect = 'move'
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
