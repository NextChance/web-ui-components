<template>
    <div class="nc-product-carousel__scroll">
      <div class="nc-product-carousel__scroll__container" ref="carousel">
        <slot/>
      </div>
      <template v-if="hasSlideNavigation">
        <button class="nc-product-carousel__scroll__button nc-product-carousel__scroll__button--left" @click="moveToLeft" v-show="!isMinScroll" :style="{ 'top': buttonsPosition }">
          <slot v-if="$slots['button_left']"></slot>
          <div v-else>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>Anterior</title>
              <path d="M7.822 10.667l8.178 7.886 8.178-7.886 2.489 2.4-10.667 10.286-10.667-10.286z"></path>
            </svg>
          </div>
        </button>
        <button class="nc-product-carousel__scroll__button nc-product-carousel__scroll__button--right" @click="moveToRight"  v-show="!isMaxScroll" :style="{ 'top': buttonsPosition }">
          <slot v-if="$slots['button_right']"></slot>
          <div v-else>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>Siguiente</title>
              <path d="M7.822 10.667l8.178 7.886 8.178-7.886 2.489 2.4-10.667 10.286-10.667-10.286z"></path>
            </svg>
          </div>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NcCoreCarousel',
  props: {
    listLength: {
      type: Number,
      default: 0
    },
    buttonsPosition: {
      type: String,
      default: '43%'
    }
  },
  data() {
    return {
      width: 124, // min image width
      isScrollInitiated: false,
      isMaxScroll: false,
      isMinScroll: false
    }
  },
  computed: {
    prueba() {
      debugger
      return this.buttonsPosition
    },
    translate() {
      return this.width * (this.listLength / 2)
    },
    hasSecondaryText() {
      return this.url || this.secondaryText
    },
    hasSlideNavigation() {
      return this.listLength > 1
    }
  },
  mounted() {
    window.addEventListener('resize', this.initializeValues)
    this.$refs.carousel.addEventListener('scroll', this.setScrollStatus)
    this.initializeValues()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initializeValues)
  },
  methods: {
    initializeValues() {
      this.isScrollInitiated = false
      this.isMaxScroll = false
      this.isMinScroll = true
      this.containerWidth =
        this.$refs.carousel && this.$refs.carousel.offsetWidth
      this.width = this.containerWidth / this.listLength
    },
    moveToRight() {
      let maxTranslation =
        this.$parent.$refs.carouselContent && this.$parent.$refs.carouselContent.offsetWidth - this.containerWidth
      let position = this.$refs.carousel.scrollLeft
      position += this.translate
      if (position > maxTranslation) {
        position = maxTranslation
      }
      this.$refs.carousel.scrollLeft = position
    },
    moveToLeft() {
      let position = this.$refs.carousel.scrollLeft
      position -= this.translate
      if (position < 0) {
        position = 0
      }
      this.$refs.carousel.scrollLeft = position
    },
    setScrollStatus() {
      let maxTranslation =
        this.$parent.$refs.carouselContent && this.$parent.$refs.carouselContent.offsetWidth - this.containerWidth
      if (!this.isScrollInitiated) {
        this.isScrollInitiated = true
      }
      this.isMaxScroll = this.$refs.carousel && this.$refs.carousel.scrollLeft === maxTranslation
      this.isMinScroll = !this.$refs.carousel || this.$refs.carousel.scrollLeft === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.nc-product-carousel__scroll {
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  &__container {
    position: relative;
    scrollbar-width: none;
    height: 100%;
    width: 100%;
    display: block;
    box-sizing: border-box;
    @media (min-width: $breakpoint-tablet) {
      display: flex;
      justify-content: space-between;
      scroll-snap-type: x;
      overflow-x: scroll;
      scroll-behavior: smooth;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  &__button {
    display: none;
    cursor: pointer;
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background-color: white;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
    padding: 5px;
    @media (min-width: $breakpoint-desktop-s) {
      display: block;
      position: absolute;
      svg {
        display: block;
        width: 14px;
        height: 14px;
      }
      &--left {
        left: 0;
        transform: rotate(90deg);
        margin-left: 20px;
      }
      &--right {
        right: 0;
        transform: rotate(-90deg);
        margin-right: 20px;
      }
    }
  }
}
</style>
