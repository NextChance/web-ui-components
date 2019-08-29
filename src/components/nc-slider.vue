<template>
    <div class="nc-slider">
        <div
            ref="rail"
            class="nc-slider__rail">
            <div class="nc-slider__rail nc-slider__rail-second"></div>
            <div class="nc-slider__rail nc-slider__rail-main" :style="{ left: leftPosition, right: rightPosition }"></div>
            <div
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
                @mouseleave="stopDrag"
                @mousemove="onPanHorizontal"
                @mousedown="startDrag"
                v-touch:start="startDrag"
                v-touch:end="stopDrag"
                v-touch:moving="onPanHorizontal"></div>
            <div
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
                @mouseleave="stopDrag"
                @mousemove="onPanHorizontal"
                @mousedown="startDrag"
                v-touch:start="startDrag"
                v-touch:end="stopDrag"
                v-touch:moving="onPanHorizontal"></div>
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
        maxValue: [String, Number]
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
            const minValue = ((Number(this.max) * Number(this.minIconPosition)) / Number(this.maxRail));
            let parseNumber = Number(minValue) ? Number(minValue).toFixed(0) : Number(this.minIconPosition);
            parseNumber = parseNumber <= this.min ? this.min : parseNumber;
            parseNumber = parseNumber >= this.max ? this.max - (this.iconSize / 2) : parseNumber;

            this.currentMinValue = parseNumber;
        },

        maxValueNow() {
            const maxValue = (Number(this.max) * Number(this.maxIconPosition)) / Number(this.maxRail);
            let parseNumber = Boolean(Number(maxValue)) ? Number(maxValue).toFixed(0) : Number(this.max);
            parseNumber = parseNumber >= this.max ? this.max : parseNumber;
            parseNumber = parseNumber <= 5 ? this.minValue : parseNumber;
            if (this.onlyHasMaxLabel) {
              parseNumber = (parseNumber < (this.iconSize / 2)) ? this.minValue : parseNumber;
            }

            this.currentMaxValue = parseNumber;
        },

        calculateMinValuePercentage() {
          let minValue = Number(this.minValue) === 0 ? Number(this.minValue) + 1 : Number(this.minValue);
          const calculatedValue = (minValue * Number(this.maxPercentage)) / Number(this.max);
          const percentage = Number(this.minValue) ? calculatedValue.toFixed(0) : Number(this.minPercentage);

          this.calculateMinIconPosition(percentage)
        },

        calculateMaxValuePercentage() {
          const calculatedValue = (Number(this.maxValue) * Number(this.maxPercentage)) / Number(this.max);
          const percentage = Number(this.maxValue) ? calculatedValue.toFixed(0) : Number(this.maxPercentage);

          this.calculateMaxIconPosition(percentage)
        },

        calculateMinIconPosition(percentage) {
          const calculatedValue = Number(percentage) ? Number(percentage) : this.minPercentage;
          const parsePosition = calculatedValue ? ((calculatedValue * this.maxRail) / this.maxPercentage).toFixed(0) : this.minPercentage;

          this.leftPosition = parsePosition + 'px';
          this.minIconPosition = parsePosition;
        },

        calculateMaxIconPosition(percentage) {
          const calculatedValue = Number(percentage) ? Number(percentage) : this.maxRail;
          const parsePosition = calculatedValue ? ((calculatedValue * this.maxRail) / this.maxPercentage).toFixed(0) : this.maxRail;

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
            const railLeft = rail.offsetLeft;
            const realUserPosition = position - railLeft;
            const halfIconSize = this.iconSize / 2;
            const borderIcon = 4;
            let iconPosition = realUserPosition - halfIconSize;

            // MAXIMUM POSITION
            if (realUserPosition > (railWidth - this.iconSize)) {
                iconPosition = railWidth - this.iconSize;
            }

            // MINIMUN POSITION
            if (realUserPosition < (this.minRail - this.iconSize)) {
                iconPosition = this.minRail;
            }

            if (icon === 'min') {
              if (realUserPosition - this.iconSize - borderIcon > Number(this.maxIconPosition)) {
                iconPosition = Number(this.maxIconPosition) - halfIconSize;
              }
              if (realUserPosition < (this.minRail - this.iconSize) ||
                  realUserPosition - this.iconSize < this.minRail) {
                  iconPosition = this.minRail;
              }
              this[`${icon}IconPosition`] = iconPosition;
              this.minValueNow()
            } else {
              if ((realUserPosition - this.iconSize) <= Number(this.minIconPosition)) {
                if (this.onlyHasMaxLabel) {
                  iconPosition = Number(this.minIconPosition) + 1;
                }
                if (!this.onlyHasMaxLabel && (this.maxIconPosition >= this.minIconPosition)) {
                    iconPosition = Number(this.minIconPosition) + Number(this.iconSize);
                } else if (this.maxIconPosition <= this.minIconPosition) {
                    iconPosition = Number(this.maxIconPosition) + 1;
                } else {
                    iconPosition = Number(this.minIconPosition) + 1;
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
  height: 22px;
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
  background-color: #ffffff;
  border-radius: 100%;
  border: solid 3px $main-color;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.19);
  box-sizing: border-box;
  height: 22px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 8px;
  width: 22px;
}

.nc-slider__icon:focus {
    outline: none;
}
</style>
