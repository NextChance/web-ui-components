<template>
  <div class="nc-core-carousel">
    <div class="nc-core-carousel__container" ref="carousel">
      <slot/>
    </div>
    <template v-if="hasSlideNavigation">
      <button  v-if="!isMinScroll" class="nc-core-carousel__button nc-core-carousel__button--left" @click="moveToLeft">
        <slot v-if="$slots['button_left']"></slot>
        <template v-else>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>Anterior</title>
            <path d="M7.822 10.667l8.178 7.886 8.178-7.886 2.489 2.4-10.667 10.286-10.667-10.286z"></path>
          </svg>
        </template>
      </button>
      <button v-if="!isMaxScroll" class="nc-core-carousel__button nc-core-carousel__button--right" @click="moveToRight">
        <slot v-if="$slots['button_right']"></slot>
        <template v-else>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>Siguiente</title>
            <path d="M7.822 10.667l8.178 7.886 8.178-7.886 2.489 2.4-10.667 10.286-10.667-10.286z"></path>
          </svg>
        </template>
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NcCoreCarousel',
  data() {
    return {
      carousel: null,
      maxTranslation: 0,
      isMaxScroll: false,
      isMinScroll: false,
      hasSlideNavigation: false
    }
  },
  computed: {
    hasSecondaryText() {
      return this.url || this.secondaryText
    }
  },
  mounted() {
    this.carousel = this.$refs.carousel
    const { maxTranslation, hasSlideNavigation } = this.getCarouselSizing()
    window.addEventListener('resize', this.onWindowResize)
    this.carousel.addEventListener('scroll', this.setArrowStatus)
    this.setScrollStatus(
      maxTranslation,
      hasSlideNavigation,
      this.carousel.scrollLeft
    )
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
    this.carousel.removeEventListener('scroll', this.setArrowStatus)
  },
  methods: {
    onWindowResize() {
      const { maxTranslation, hasSlideNavigation } = this.getCarouselSizing()
      this.setScrollStatus(
        maxTranslation,
        hasSlideNavigation,
        this.carousel.scrollLeft
      )
    },
    getCarouselSizing() {
      const containerWidth = this.carousel && this.carousel.offsetWidth
      const maxTranslation = this.carousel
        ? this.carousel.scrollWidth - containerWidth
        : 0
      const hasSlideNavigation = maxTranslation > 0

      return {
        containerWidth,
        maxTranslation,
        hasSlideNavigation
      }
    },
    moveToRight() {
      let scrollPosition
      const {
        containerWidth,
        maxTranslation,
        hasSlideNavigation
      } = this.getCarouselSizing()
      scrollPosition = this.carousel.scrollLeft + containerWidth
      scrollPosition =
        scrollPosition > maxTranslation ? maxTranslation : scrollPosition
      this.carousel.scrollLeft = scrollPosition
      this.setScrollStatus(maxTranslation, hasSlideNavigation, scrollPosition)
    },
    moveToLeft() {
      let scrollPosition
      const {
        containerWidth,
        maxTranslation,
        hasSlideNavigation
      } = this.getCarouselSizing()
      scrollPosition = this.carousel.scrollLeft - containerWidth
      scrollPosition = scrollPosition < 0 ? 0 : scrollPosition
      this.carousel.scrollLeft = scrollPosition
      this.setScrollStatus(maxTranslation, hasSlideNavigation, scrollPosition)
    },
    setScrollStatus(maxTranslation, hasSlideNavigation, scrollPosition) {
      this.hasSlideNavigation = hasSlideNavigation
      this.isMaxScroll = scrollPosition === maxTranslation
      this.isMinScroll = scrollPosition === 0
    },
    setArrowStatus() {
      const { maxTranslation, hasSlideNavigation } = this.getCarouselSizing()
      this.setScrollStatus(
        maxTranslation,
        hasSlideNavigation,
        this.carousel.scrollLeft
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.nc-core-carousel {
  width: 100%;
  height: auto;
  position: relative;
  $ncCoreCarousel: &;

  &__container {
    position: relative;
    scrollbar-width: none;
    display: block;
    box-sizing: border-box;

    @media (min-width: $breakpoint-tablet) {
      scroll-snap-type: x;
      overflow-x: scroll;
      scroll-behavior: smooth;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    @media (min-width: $breakpoint-desktop-s) {
      &::-webkit-scrollbar {
        display: block;
        height: 6px;
        padding: 3px 50px 0 0;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: transparent;
      }
    }
  }
  &__button {
    display: none;
    cursor: pointer;
    position: absolute;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: white;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
    padding: 5px;
    top: 0;
    bottom: 0;
    margin: auto;
    @media (min-width: $breakpoint-desktop-s) {
      display: block;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0.3s, opacity 0.3s ease-in;
      position: absolute;
      svg {
        margin: auto;
        display: block;
        width: 14px;
        fill: #aaaaaa;
        height: 14px;
      }
      &--left {
        left: 0;
        margin-left: -8px;
        svg {
          transform: rotate(90deg);
        }
      }
      &--right {
        right: 0;
        margin-right: -8px;
        svg {
          transform: rotate(-90deg);
        }
      }
    }
  }
  &:hover,
  &:focus {
    @media (min-width: $breakpoint-desktop-s) {
      #{$ncCoreCarousel} {
        &__button {
          visibility: visible;
          opacity: 1;
        }
        &__container {
          &::-webkit-scrollbar-thumb {
            background-color: #ebebeb;
          }
        }
    }
    }
  }
}
</style>
