<template>
  <div class="nc-slideshow">
    <ul class="nc-slideshow__content" ref="nc-slideshow-list" :style="{transform: `translate3d(-${slidePosition}px, 0, 0)`}">
      <template>
        <li v-for="(item, index) in virtualImages" :key="index" class="nc-slideshow__content__item">
          <a :href="item.url"><img :src="item.image" :alt="item.alt"></a>
        </li>
      </template>
    </ul>
    <template v-if="hasSlideNavigation">
      <button class="nc-slideshow__button nc-slideshow__button--left" @click="prevSlide">
        <slot v-if="$slots['button_left']"></slot>
        <div v-else>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <title>arrow_down</title>
            <path d="M7.822 10.667l8.178 7.886 8.178-7.886 2.489 2.4-10.667 10.286-10.667-10.286z"></path>
          </svg>
        </div>
      </button>
      <button class="nc-slideshow__button nc-slideshow__button--right" @click="nextSlide">
        <slot v-if="$slots['button_right']"></slot>
        <div v-else>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>arrow_down</title>
            <path d="M7.822 10.667l8.178 7.886 8.178-7.886 2.489 2.4-10.667 10.286-10.667-10.286z"></path>
          </svg>
        </div>
      </button>
    </template>
    <template v-if="hasSlideNavigation">
      <div class="nc-slideshow__dots">
        <span
            v-for="(dot, indexDot) in images"
            :key="`dot-${indexDot}`"
            class="nc-slideshow__dots__item"
            :class="[currentIndex === indexDot || (currentIndex === virtualImages.length -1 && indexDot === 0 ) ? 'nc-slideshow__dots__item--active' : 'nc-slideshow__dots__item--regular']"
            @click="goToIndex(indexDot)">
        </span>
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
      if (
        !this.animationStart &&
        this.currentIndex < this.virtualImages.length - 1
      ) {
        this.prevIndex = this.currentIndex
        ++this.currentIndex
        this.animationRateHandler = window.requestAnimationFrame(
          this.slideAnimation
        )
      }
    },
    prevSlide() {
      if (!this.animationStart) {
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
    if (!!this.autoplayTime && this.images.length > 1) {
      setInterval(this.nextSlide, this.autoplayTime)
    }
  }
}
</script>

<style lang="scss" scoped>
$breakpoint-desktop: 1024px;
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
    outline: none;
    cursor: pointer;
    position: absolute;
    width: 24px;
    border-radius: 50%;
    border: none;
    background-color: white;
    opacity: 0.6;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
    top: 50%;
    transform: translateY(-50%);
    height: 24px;
    padding: 5px;

    svg{
      display: block;
      width: 14px;
      height: 14px;
    }
    &--left {
      left: 20px;
      svg{
        transform: rotate(90deg);
      }
    }
    &--right {
      right: 20px;
      svg {
        transform: rotate(-90deg);
      }
    }
  }

  &__dots {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    bottom: 8px;
    @media (min-width: $breakpoint-desktop) {
      bottom: 12px;
    }
    &__item {
      cursor: pointer;
      height: 10px;
      width: 10px;
      background-color: white;
      border-radius: 50%;
      display: inline-block;
      opacity: .5;
      &:nth-child(2) {
        margin-left: 8px;
      }
      &--active {
        opacity: 1;
      }
    }
  }
}
</style>
