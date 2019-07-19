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
                @click="startDrag"
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
                @click="startDrag"
                v-touch:start="startDrag"
                v-touch:end="stopDrag"
                v-touch:moving="onPanHorizontal"></div>
        </div>
        <div class="nc-slider__rail-labels" :class="{ 'right': isOnlyMaxLabel }">
            <div v-if="min" class="nc-slider__rail-label min">{{minLabel}}</div>
            <div v-if="max" class="nc-slider__rail-label max">{{maxLabel}}</div>
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
        min: [String, Number],
        max: [String, Number],
        minLabel: String,
        maxLabel: String,
        minValue: [String, Number],
        maxValue: [String, Number]
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
            const minValue = ((Number(this.max) * Number(this.minIconPosition)) / Number(this.maxRail)) + Number(this.min);

            return Number(minValue) ? Number(minValue).toFixed(0) : Number(this.minIconPosition);
        },
        maxValueNow() {
            const maxValue = (Number(this.max) * Number(this.maxIconPosition)) / Number(this.maxRail);

            return Boolean(Number(maxValue)) ? Number(maxValue).toFixed(0) : Number(this.max);
        },
        isOnlyMaxLabel() {
            return !Boolean(this.min) && Boolean(this.max);
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

                this.moveSliderTo(icon, position);
            }
        },

        handleMouseMove(ev) {
            if (!this.dragging) {
                this.startDrag();
            }

            this.doDrag(ev);
        },

        onPanHorizontal(ev) {
            if (!this.dragging) {
                this.startDrag();
            }

            const icon = ev.currentTarget.id;
            const position = ev.changedTouches && ev.changedTouches.length > 0 ? ev.changedTouches[0].clientX : ev.clientX;

            this.moveSliderTo(icon, position);
        },

        moveSliderTo(icon, position) {
            if ((position  - this.iconSize) > this.maxRail) {
                return this[`${icon}IconPosition`] = this.maxRail;
            }

            if ((position  - this.iconSize) < this.minRail) {
                return this[`${icon}IconPosition`] = this.minRail;
            }

            return this[`${icon}IconPosition`] = position - this.iconSize;
        }
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
  background-color: #eee;
  background-color: $second-color;
  border-radius: 2px;
  height: 4px;
  margin-bottom: 10px;
  position: relative;
  width: 100%;
}

.nc-slider__rail-main {
  background-color: $main-color;
  left: 0;
  position: absolute;
  right: 0;
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
  top: -8px;
  width: 22px;
}

.nc-slider__icon:focus {
    outline: none;
}
</style>
