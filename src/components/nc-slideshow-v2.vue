<template>
  <div class="nc-slideshow">
    <pre>{{currentIndex}}</pre>
    <ul class="nc-slideshow__content" ref="nc-slideshow-list" :style="{transform: `translate3d(-${slidePosition}px, 0, 0)`}">
      <template>
        <li v-for="(item, index) in virtualImages" :key="index" class="nc-slideshow__content__item">
          <a :href="item.url"><img :src="item.src" :alt="item.alt"></a>
        </li>
      </template>
    </ul>
    <template v-if="hasSlideNavigation">
      <button class="nc-slideshow__button nc-slideshow__button--left" @click="prevSlide">left</button>
      <button class="nc-slideshow__button nc-slideshow__button--right" @click="nextSlide">right</button>
    </template>
    <template v-if="hasSlideNavigation">
      <div class="nc-slideshow__dots">
        <span v-for="(dot, indexDot) in images" :key="`dot-${indexDot}`" @click="goToIndex(indexDot)"></span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'nc-slideshow-v2',
  props: {
    images: {
      type: Array,
      default: () => []
    },
    autoplayTime: {
        type: Number,
        default: 0
    }
  },
  data() {
    return {
      currentIndex: 0,
      isTransitionDisabled: false,
      transitionStyle: 'transform 0.5s ease',
      animationRateHandler: undefined,
      animationStart: 0,
      slidePosition: 0,
      prevIndex: 0
    }
  },
  computed: {
    virtualImages() {
      return [...this.images, this.images[0]]
    },
    hasSlideNavigation() {
      return this.images.length > 1
    },
    getOffsetSlides() {
      return this.$refs['nc-slideshow-list']
        ? this.$refs['nc-slideshow-list'].offsetWidth
        : 0
    }
  },
  methods: {
    goToIndex(index) {
      this.currentIndex = index
    },
    nextSlide() {
        if (!this.animationStart && this.currentIndex < this.virtualImages.length - 1){
            this.prevIndex = this.currentIndex
            ++this.currentIndex
            this.animationRateHandler = window.requestAnimationFrame(
                this.slideAnimation
            )
        }
    },
    prevSlide() {
        if (!this.animationStart){
            if (this.currentIndex === 0) {
                this.currentIndex = this.virtualImages.length - 1
                this.slidePosition = this.currentIndex * this.getOffsetSlides
            }
            this.prevIndex = this.currentIndex
            --this.currentIndex
            this.animationRateHandler = window.requestAnimationFrame(
                this.slideAnimation
            )
        }
    },
    slideAnimation(timestamp) {
      if (!this.animationStart) {
        this.animationStart = timestamp
      }

      const progress = (timestamp - this.animationStart) / 500
      if (progress < 1) {
        this.slidePosition =
          this.prevIndex * this.getOffsetSlides +
          progress *
            ((this.currentIndex - this.prevIndex) * this.getOffsetSlides)
        this.animationRateHandler = window.requestAnimationFrame(
          this.slideAnimation
        )
      } else {
        this.animationStart = 0
        if (this.currentIndex === this.virtualImages.length - 1) {
          this.currentIndex = 0
        }
        this.slidePosition = this.currentIndex * this.getOffsetSlides
        window.cancelAnimationFrame(this.animationRateHandler)
      }
    }
  },
    mounted() {
      if (!!this.autoplayTime && this.images.length > 1 ) {
          setInterval(this.nextSlide, this.autoplayTime)
      }
    }
}
</script>

<style lang="scss" scoped>
.nc-slideshow {
  box-sizing: border-box;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  &__content {
    white-space: nowrap;
    list-style: none;
    padding: 0;
    margin: 0;
    &__item {
      width: 100%;
      display: inline-block;
      img {
        width: 100%;
      }
    }
  }

  &__button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    &--right {
      right: 0;
    }
  }

  &__dots {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    bottom: 12px;
    span {
      cursor: pointer;
      height: 10px;
      width: 10px;
      background-color: white;
      border-radius: 50%;
      display: inline-block;
      &:nth-child(2) {
        margin-left: 8px;
      }
    }
  }
}
</style>
