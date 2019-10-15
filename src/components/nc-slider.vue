<template>
    <div class="nc-slider">
        <div
            ref="rail"
            class="nc-slider__rail">
            <div class="nc-slider__rail nc-slider__rail-second"></div>
            <div class="nc-slider__rail nc-slider__rail-main" :style="{ left: leftPosition, right: rightPosition }"></div>
            <button
              v-if="min"
              id="min"
              role="slider"
              ref="minIcon"
              tabindex="0"
              class="nc-slider__icon nc-slider__icon-min"
              :aria-valuemin="min"
              :aria-valuenow="currentMinValue"
              :aria-valuetext="currentMinValue"
              :aria-valuemax="max"
              :aria-label="minLabel"
              :style="{left: minIconPosition + 'px'}"
              @mouseup="stopDrag"
              @mouseleave="stopDrag"
              @mouseout="stopDrag"
              @mousemove="onPanHorizontal"
              @mousedown="startDrag"
              v-touch:start="startDrag"
              v-touch:end="stopDrag"
              v-touch:moving="onPanHorizontal">
                <div class="circle"></div>
            </button>
            <button
              v-if="max"
              id="max"
              role="slider"
              ref="maxIcon"
              tabindex="0"
              class="nc-slider__icon nc-slider__icon-max"
              :aria-valuemin="min"
              :aria-valuenow="currentMaxValue"
              :aria-valuetext="currentMaxValue"
              :aria-valuemax="max"
              :aria-label="maxLabel"
              :style="{left: maxIconPosition + 'px'}"
              @mouseup="stopDrag"
              @mouseleave="stopDrag"
              @mouseout="stopDrag"
              @mousemove="onPanHorizontal"
              @mousedown="startDrag"
              v-touch:start="startDrag"
              v-touch:end="stopDrag"
              v-touch:moving="onPanHorizontal">
                <div class="circle"></div>
            </button>
        </div>
        <div class="nc-slider__rail-labels" :class="{ 'right': onlyHasMaxLabel }">
            <div v-if="min" class="nc-slider__rail-label min">{{ minLabel }}</div>
            <div v-if="max" class="nc-slider__rail-label max">{{ maxLabel }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'nc-slider',
    data() {
        return {
            dragging: false,
            iconSize: 22,
            minIconPosition: 0,
            maxIconPosition: 0,
            minRail: 0,
            maxRail: 0,
            minPercentage: 0,
            maxPercentage: 100,
            currentMinValue: 0,
            currentMaxValue: 0,
            leftPosition: '0px',
            rightPosition: '0px'
        }
    },
    props: {
        min: [String, Number],
        max: [String, Number],
        minLabel: String,
        maxLabel: String,
        minValue: [String, Number],
        maxValue: [String, Number],
        offsetLeft: Number
    },
    mounted() {
        const rail = this.$refs.rail;
        const railWidth = rail.clientWidth;

        this.maxRail = railWidth - this.iconSize;
        this.currentMinValue = this.minValue;
        this.currentMaxValue = this.maxValue;
        this.minValueNow();
        this.maxValueNow();
        this.calculateMinValuePercentage();
        this.calculateMaxValuePercentage();

        window.addEventListener('resize', this.resizeSlider)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeSlider)
    },
    computed: {
        onlyHasMaxLabel() {
            return !Boolean(this.min) && Boolean(this.max);
        },
    },
    watch: {
      minValue(newValue, oldValue) {
        this.currentMinValue = newValue;
        this.calculateMinValuePercentage()
      },

      maxValue(newValue, oldValue) {
        this.currentMaxValue = newValue;
        this.calculateMaxValuePercentage()
      }
    },
    methods: {
        resizeSlider() {
          const rail = this.$refs.rail;
          const railWidth = rail.clientWidth;

          this.maxRail = railWidth - this.iconSize;
          this.currentMinValue = this.minValue;
          this.currentMaxValue = this.maxValue;
          this.minValueNow();
          this.maxValueNow();
          this.calculateMinValuePercentage();
          this.calculateMaxValuePercentage();
        },

        minValueNow() {
            const minValue = ((parseInt(this.max) * parseInt(this.minIconPosition)) / parseInt(this.maxRail));
            let parseNumber = parseInt(minValue) ? parseInt(minValue).toFixed(0) : parseInt(this.minIconPosition);
            parseNumber = parseNumber >= this.max ? this.max - (this.iconSize / 2) : parseNumber;

            if (parseNumber <= this.min) {
              parseNumber = this.min;
              this.calculateMinValuePercentage()
            }

            this.currentMinValue = parseNumber;
        },

        maxValueNow() {
            const maxValue = (parseInt(this.max) * parseInt(this.maxIconPosition)) / parseInt(this.maxRail);
            let parseNumber = Boolean(parseInt(maxValue)) ? parseInt(maxValue).toFixed(0) : parseInt(this.max);
            parseNumber = parseNumber >= this.max ? this.max : parseNumber;
            parseNumber = parseNumber <= 5 ? this.minValue : parseNumber;
            if (this.onlyHasMaxLabel) {
              parseNumber = (parseNumber < (this.iconSize / 2)) ? this.minValue : parseNumber;
            }

            this.currentMaxValue = parseNumber;
        },

        calculateMinValuePercentage() {
          let minValue = parseInt(this.minValue) === 0 ? parseInt(this.minValue) + 1 : parseInt(this.minValue);
          const calculatedValue = (minValue * parseInt(this.maxPercentage)) / parseInt(this.max);
          const percentage = parseInt(this.minValue) ? calculatedValue.toFixed(0) : parseInt(this.minPercentage);

          this.calculateMinIconPosition(percentage)
        },

        calculateMaxValuePercentage() {
          const calculatedValue = (parseInt(this.maxValue) * parseInt(this.maxPercentage)) / parseInt(this.max);
          const percentage = parseInt(this.maxValue) ? calculatedValue.toFixed(0) : parseInt(this.maxPercentage);

          this.calculateMaxIconPosition(percentage)
        },

        calculateMinIconPosition(percentage) {
          const calculatedValue = parseInt(percentage) ? parseInt(percentage) : this.minPercentage;
          const parsePosition = parseInt(calculatedValue ? ((calculatedValue * this.maxRail) / this.maxPercentage).toFixed(0) : this.minPercentage);
          this.leftPosition = (parsePosition) + 'px';
          this.minIconPosition = parsePosition;
        },

        calculateMaxIconPosition(percentage) {
          const calculatedValue = parseInt(percentage) ? parseInt(percentage) : this.maxRail;
          const parsePosition = parseInt(calculatedValue ? ((calculatedValue * this.maxRail) / this.maxPercentage).toFixed(0) : this.maxRail);

          this.rightPosition = (this.maxRail - parsePosition) + 'px';
          this.maxIconPosition = parsePosition;
        },

        startDrag(ev) {
            this.dragging = true;
        },

        stopDrag() {
          const values = [this.currentMinValue, this.currentMaxValue];

          this.dragging = false;
          this.$emit('slider-stop-drag', values);
        },

        onPanHorizontal(ev) {
            if (this.dragging) {
              const icon = ev.currentTarget.id || ev.target.id;
              const position = ev.changedTouches && ev.changedTouches.length > 0 ? ev.changedTouches[0].clientX : ev.clientX;

              return this.moveIcon(icon, position);
            }
        },

        moveIcon(icon, position) {
            const rail = this.$refs.rail;
            const railWidth = rail.clientWidth;
            const railLeft = this.offsetLeft ? this.offsetLeft : rail.offsetLeft;
            const realUserPosition = position - railLeft;
            const halfIconSize = this.iconSize / 2;
            const borderIcon = 4;
            let iconPosition = realUserPosition - halfIconSize;

            // MAXIMUM POSITION
            if (realUserPosition > railWidth) {
                iconPosition = railWidth - this.iconSize;
            }

            // MINIMUN POSITION
            if (realUserPosition < (this.minRail - this.iconSize)) {
                iconPosition = this.minRail;
            }

            if (icon === 'min') {
              if (realUserPosition - this.iconSize - borderIcon > parseInt(this.maxIconPosition)) {
                iconPosition = parseInt(this.maxIconPosition) - halfIconSize;
              }
              this[`${icon}IconPosition`] = iconPosition;
              this.minValueNow()
            } else {
              if ((realUserPosition - this.iconSize) <= parseInt(this.minIconPosition)) {
                if (this.onlyHasMaxLabel) {
                  iconPosition = realUserPosition - halfIconSize + 1;
                }
                if (!this.onlyHasMaxLabel && (this.maxIconPosition >= this.minIconPosition)) {
                    iconPosition = parseInt(this.minIconPosition) + parseInt(this.iconSize);
                } else if (this.maxIconPosition <= this.minIconPosition) {
                    iconPosition = parseInt(this.maxIconPosition) + 1;
                } else {
                    iconPosition = (realUserPosition - halfIconSize + 1) <= this.minRail ? this.minRail : (realUserPosition - halfIconSize + 1);
                }
              }
              this[`${icon}IconPosition`] = iconPosition;
              this.maxValueNow()
            }
        },
    }
}
</script>

<style lang="scss">
$main-color: #fa5a5a;
$second-color: #d8d8d8;

.nc-slider {
  padding: 0.5em 0;
  width: 100%;
}

.nc-slider__rail-labels {
  align-items: center;
  color: #272727;
  display: flex;
  font-size: 13px;
  font-stretch: normal;
  font-style: normal;
  font-weight: normal;
  justify-content: space-between;
  letter-spacing: normal;
  line-height: 22px;
  position: relative;
  text-align: right;

  &.right {
    justify-content: flex-end;
  }
}

.nc-slider__rail-label {
  box-sizing: border-box;
}

.nc-slider__rail-label-min {
  padding-right: 0.5em;
  text-align: right;
}

.nc-slider__rail-label-max {
  padding-left: 0.5em;
  text-align: left;
}

.nc-slider__rail {
  height: 30px;
  margin-bottom: 10px;
  padding: 9px 0;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.nc-slider__rail-second {
  background-color: $second-color;
  border-radius: 2px;
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  margin: 9px 0;
  padding: 0;
  width: auto;
}

.nc-slider__rail-main {
  background-color: $main-color;
  border-radius: 2px;
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  margin: 9px 0;
  padding: 0;
  width: auto;
}

.nc-slider__icon {
  background: transparent;
  top: 5px;
  position: absolute;
  margin: 0;
  padding: 0;
  height: 30px;
  width: 22px;
  & .circle {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.19);
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 100%;
    border: solid 3px $main-color;
    height: 22px;
    width: 22px;
  }
}

.nc-slider__icon:focus {
    outline: none;
}
</style>
