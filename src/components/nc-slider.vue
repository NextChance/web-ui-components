<template>
    <div class="nc-slider">
        <div 
            ref="rail"
            class="nc-slider__rail">
            <div class="nc-slider__rail nc-slider__rail-main" :style="styleMainRail"></div>
            <div 
                v-if="min"
                id="min"
                role="slider"
                ref="minIcon"
                tabindex="0"
                class="nc-slider__icon nc-slider__icon-min"
                :aria-valuemin="min"
                :aria-valuenow="minValueNow"
                :aria-valuetext="minValueNow"
                :aria-valuemax="max"
                :aria-label="minLabel"
                :style="{left: minIconPosition + 'px'}"
                @mouseleave="stopDrag"
                @mousemove="handleMouseMove"
                @mousedown="startDrag"
                @mouseup="stopDrag"
                @focus="startDrag"
                @click="startDrag"></div>
            <div 
                v-if="max"
                id="max"
                role="slider"
                ref="maxIcon"
                tabindex="0"
                class="nc-slider__icon nc-slider__icon-max"
                :aria-valuemin="min"
                :aria-valuenow="maxValueNow"
                :aria-valuetext="maxValueNow"
                :aria-valuemax="max"
                :aria-label="maxLabel"
                :style="{left: maxIconPosition + 'px'}"
                @mouseleave="stopDrag"
                @mousemove="handleMouseMove"
                @mousedown="startDrag"
                @mouseup="stopDrag"
                @focus="startDrag"
                @click="startDrag"></div>
        </div>
        <div class="nc-slider__rail-labels">
            <div v-if="min" class="nc-slider__rail-label min">{{minLabel}} {{minValueNow}} {{metrics}}</div>
            <div v-if="max" class="nc-slider__rail-label max">{{maxLabel}} {{maxValueNow}} {{metrics}}</div>
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
            maxSize: 100
        }
    },
    props: {
        metrics: {
            type: String,
            default: ''
        },
        min: {
            type: String
        },
        minLabel: {
            label: String,
        },
        max: {
            type: String,
        },
        maxLabel: {
            label: String,
        }
    },
    mounted() {
        const rail = this.$refs.rail;
        this.maxRail = rail.clientWidth - this.iconSize;
        this.maxIconPosition = this.maxRail;
    },
    computed: {
        styleMainRail() {
            const leftPosition = this.minIconPosition + 'px';
            const rightPosition = (this.maxRail - this.maxIconPosition) + 'px';

            return { left: leftPosition, right: rightPosition };
        },
        minValueNow() {
            const minValue = (this.maxSize * this.minIconPosition) / this.maxRail;

            return Number(minValue) ? Number(minValue).toFixed(0) : this.minIconPosition;
        },
        maxValueNow() {
            const maxValue = (this.max * this.maxIconPosition) / this.maxRail;

            return Number(maxValue) ? Number(maxValue).toFixed(0) : this.maxSize;
        }
    },
    methods: {
        startDrag() {
            this.dragging = true;
        },

        stopDrag() {
            const values = [this.minValueNow, this.maxValueNow];
            this.dragging = false;
            this.$emit('slider-stop-drag', values);
        },

        doDrag(ev) {
            const icon = ev.target.id;

            if (this.dragging) {
                const position = ev.clientX;

                if ((position  - this.iconSize) > this.maxRail) {
                    return this[`${icon}IconPosition`] = this.maxRail;
                }

                if ((position  - this.iconSize) < this.minRail) {
                    return this[`${icon}IconPosition`] = this.minRail;
                }

                return this[`${icon}IconPosition`] = position - this.iconSize;
            }
        },

        handleMouseMove(ev) {
            if (!this.dragging) {
                this.startDrag();
            }

            this.doDrag(ev);
        }
    }
}
</script>

<style lang="scss">
$main-color: #fa5a5a;
$second-color: #d8d8d8;

.nc-slider {
  padding: 0.5em 0;
}

.nc-slider__rail-labels {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: normal;
  text-align: right;
  color: #272727;
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
  background-color: #eee;
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: $second-color;
  margin-bottom: 10px;
}

.nc-slider__rail-main {
  background-color: $main-color;
  right: 0;
  left: 0;
  position: absolute;
  width: auto;
}

.nc-slider__icon {
  position: absolute;
  padding: 0;
  margin: 0;
  top: -8px;
  width: 22px;
  height: 22px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.19);
  border: solid 3px $main-color;
  border-radius: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
}

.nc-slider__icon:focus {
    outline: none;
}
</style>
