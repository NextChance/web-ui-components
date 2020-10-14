<template>
  <div class="nc-slideshow">
    <ul
        v-touch:swipe.right="prevSlide"
        v-touch:swipe.left="nextSlide"
        class="nc-slideshow__content"
        ref="nc-slideshow-list"
        :style="{transform: `translate3d(-${slidePosition}px, 0, 0)`}">
      <template>
        <li v-for="(item, index) in virtualImages" :key="index" class="nc-slideshow__content__item">
          <a :href="item.url" :target="item.isExternalUrl ? '_blank': '_self'" @click="handleClick($event, item.url, index+1)"><img :src="item.image" :alt="item.alt"></a>
        </li>
      </template>
    </ul>
    <template v-if="hasSlideNavigation">
      <button class="nc-slideshow__button nc-slideshow__button--left" @click="prevSlide">
        <slot v-if="$slots['button_left']"></slot>
        <div v-else>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <title>Anterior</title>
            <path d="M7.822 10.667l8.178 7.886 8.178-7.886 2.489 2.4-10.667 10.286-10.667-10.286z"></path>
          </svg>
        </div>
      </button>
      <button class="nc-slideshow__button nc-slideshow__button--right" @click="nextSlide">
        <slot v-if="$slots['button_right']"></slot>
        <div v-else>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>Siguiente</title>
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
            :class="[currentIndex === indexDot || (currentIndex === virtualImages.length -1 && indexDot === 0 ) ? 'nc-slideshow__dots__item--active' : 'nc-slideshow__dots__item--regular', {'nc-slideshow__dots__item--disabled': !hasDotNavigation}]"
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
    },
    hasDotNavigation: {
      type: Boolean,
      default: false
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
      prevIndex: 0,
      offsetSlides: 0,
      handleInterval: null
    }
  },
  watch: {
    autoplayTime(val, oldVal) {
      if (val !== oldVal && !!this.autoplayTime && this.images.length > 1) {
        clearTimeout(this.handleInterval)
        this.handleInterval = setTimeout(this.nextSlide, val)
      }
    }
  },
  computed: {
    virtualImages() {
      return [...this.images, this.images[0]]
    },
    hasSlideNavigation() {
      return this.images.length > 1
    }
  },
  methods: {
    goToIndex(index) {
      if (this.hasDotNavigation && this.currentIndex !== index) {
        this.prevIndex = this.currentIndex
        this.currentIndex = index
        this.animationRateHandler = window.requestAnimationFrame(
          this.slideAnimation
        )
      }
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
          this.slidePosition = this.currentIndex * this.offsetSlides
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
          this.prevIndex * this.offsetSlides +
          progress * ((this.currentIndex - this.prevIndex) * this.offsetSlides)
        this.animationRateHandler = window.requestAnimationFrame(
          this.slideAnimation
        )
      } else {
        this.animationStart = 0
        if (this.currentIndex === this.virtualImages.length - 1) {
          this.currentIndex = 0
        }
        this.slidePosition = this.currentIndex * this.offsetSlides
        window.cancelAnimationFrame(this.animationRateHandler)
        clearTimeout(this.handleInterval)
        this.handleInterval = setTimeout(this.nextSlide, this.autoplayTime)
      }
    },
    resizeSlideshow() {
      this.offsetSlides = this.$refs['nc-slideshow-list']
        ? this.$refs['nc-slideshow-list'].offsetWidth
        : 0
      this.slidePosition = this.currentIndex * this.offsetSlides
    },
    handleClick($event, url, trigger) {
      $event.preventDefault()
      this.$emit('on-analytics', { trigger })
      this.$emit('on-navigate', url)
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeSlideshow)
    this.resizeSlideshow()
    if (!!this.autoplayTime && this.images.length > 1) {
      this.handleInterval = setTimeout(this.nextSlide, this.autoplayTime)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeSlideshow)
    clearTimeout(this.handleInterval)
  }
}
</script>

<style lang="scss" scoped>
.nc-slideshow {
  background-color: $color-white;
  box-sizing: border-box;
  max-width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  @media (min-width: $breakpoint-desktop-s) {
    border-radius: 8px;
  }
  &__content {
    height: 100%;
    white-space: nowrap;
    list-style: none;
    padding: 0;
    margin: 0;
    &__item {
      width: 100%;
      height: 100%;
      display: inline-block;
      overflow: hidden;
      a {
        height: 100%;
        display: block;
        position: relative;
      }
      img {
        position: absolute;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  &__button {
    display: none;
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

    @media (min-width: $breakpoint-desktop-s) {
      display: block;
    }

    svg {
      display: block;
      width: 14px;
      height: 14px;
    }
    &--left {
      left: 20px;
      svg {
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
    line-height: 0;
    bottom: 8px;
    @media (min-width: $breakpoint-desktop-s) {
      bottom: 12px;
    }
    &__item {
      cursor: pointer;
      height: 6px;
      width: 6px;
      background-color: white;
      border-radius: 50%;
      display: inline-block;
      opacity: 0.5;
      @media (min-width: $breakpoint-tablet) {
        height: 10px;
        width: 10px;
      }
      &--disabled {
        cursor: inherit;
      }
      &:nth-child(n + 2) {
        margin-left: 8px;
      }
      &--active {
        opacity: 1;
      }
    }
  }
}
</style>
