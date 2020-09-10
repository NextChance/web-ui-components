<template>
  <div class="nc-product-carousel__scroll">
    <div class="nc-product-carousel__scroll__container" ref="carousel">
      <slot/>
    </div>
    <template v-if="hasSlideNavigation">
      <button  v-if="!isMinScroll" :style="{ 'top': buttonsPosition }" class="nc-product-carousel__scroll__button nc-product-carousel__scroll__button--left" @click="moveToLeft">
        <slot v-if="$slots['button_left']"></slot>
        <div v-else>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>Anterior</title>
            <path d="M7.822 10.667l8.178 7.886 8.178-7.886 2.489 2.4-10.667 10.286-10.667-10.286z"></path>
          </svg>
        </div>
      </button>
      <button v-if="!isMaxScroll" :style="{ 'top': buttonsPosition }" class="nc-product-carousel__scroll__button nc-product-carousel__scroll__button--right" @click="moveToRight">
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
      carousel: null,
      maxTranslation: 0,
      width: 124, // min image width
      isMaxScroll: false,
      isMinScroll: false,
      hasSlideNavigation: false
    }
  },
  computed: {
    translate() {
      return this.width * (this.listLength / 2)
    },
    hasSecondaryText() {
      return this.url || this.secondaryText
    }
  },
  mounted() {
    this.carousel = this.$refs.carousel
    window.addEventListener('resize', this.onWindowResize)
    this.carousel.addEventListener('scroll', this.setScrollStatus)
    this.onWindowResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    onWindowResize() {
      this.containerWidth = this.carousel && this.carousel.offsetWidth
      this.maxTranslation = this.carousel ? this.carousel.scrollWidth - this.containerWidth : 0
      this.hasSlideNavigation = this.maxTranslation > 0
      this.width = this.containerWidth / this.listLength
      this.setScrollStatus()
    },
    moveToRight() {
      let position = this.carousel.scrollLeft + this.translate
      position = position > this.maxTranslation ? this.maxTranslation : position
      this.carousel.scrollLeft = position
    },
    moveToLeft() {
      let position = this.carousel.scrollLeft - this.translate
      position = position < 0 ? 0 : position
      this.carousel.scrollLeft = position
    },
    setScrollStatus() {
      this.isMaxScroll = this.carousel && this.carousel.scrollLeft === this.maxTranslation
      this.isMinScroll = !this.carousel || this.carousel.scrollLeft === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.nc-product-carousel__scroll {
  width: 100%;
  height: auto;
  position: relative;

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
