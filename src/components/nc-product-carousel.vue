<template>
  <div class="nc-product-carousel">
    <p>{{ title }}</p>
    <div class="nc-product-carousel__scroll">
      <div class="nc-product-carousel__scroll__container" ref="carousel">
        <ul
          ref="carouselList"
          class="nc-product-carousel__scroll__list"
        >
          <li
            v-for="(item, index) in items"
            :key="`product-carousel-${index}`"
            ref="item"
            class="nc-product-carousel__scroll__list__item"
          >
            <a :href="item.url" @click="handleClick(item.url)" 
            class="link">
              <div class="item-image-container">
                <img :src="item.image.src" :alt="item.image.alt" class="item-image">
              </div>
              <div class="item-extra-content">
                <slot/>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <template v-if="hasSlideNavigation">
        <button class="nc-product-carousel__scroll__button  nc-product-carousel__scroll__button--left" @click="moveToLeft" v-show="!isMinScroll">
          <slot v-if="$slots['button_left']"></slot>
          <div v-else>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>Anterior</title>
              <path d="M7.822 10.667l8.178 7.886 8.178-7.886 2.489 2.4-10.667 10.286-10.667-10.286z"></path>
            </svg>
          </div>
        </button>
        <button class="nc-product-carousel__scroll__button nc-product-carousel__scroll__button--right" @click="moveToRight"  v-show="!isMaxScroll">
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
    <template v-if="hasSecondaryText">
      <p v-if="secondaryText">{{ secondaryText }}</p>
      <a v-else :href="url" @click="handleClick(url)">{{ url }}</a>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NcProductCarousel',
  props: {
    title: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    secondaryText: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
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
    listLength() {
      return this.items.length
    },
    translate() {
      return this.width * (this.listLength / 2)
    },
    hasSecondaryText() {
      return this.url || this.secondaryText
    },
    hasSlideNavigation() {
      return this.items.length > 1
    }
  },
  /* METHODS SCROLL*/
  mounted() {
    window.addEventListener('resize', this.initializeValues)
    this.$refs.carousel.addEventListener('scroll', this.setScrollStatus)
    this.initializeValues()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initializeValues)
  },
  /* METHODS SCROLL*/
  methods: {
    handleClick(url) {
      this.$emit('on-analytics', { destination: url })
    },
    /* METHODS SCROLL*/
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
        this.$refs.carouselList && this.$refs.carouselList.offsetWidth - this.containerWidth
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
        this.$refs.carouselList && this.$refs.carouselList.offsetWidth - this.containerWidth
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
.nc-product-carousel {
  background: white;
  box-sizing: border-box;
  padding: 16px;
  width: calc(100% - 32px);
  @media (min-width: $breakpoint-tablet) {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 24px 0 20px 12px 22px;
  }

  @media (min-width: $breakpoint-desktop-s) {
    padding: 24px 0 16px 20px;
    box-sizing: border-box;
  }

  @media (min-width: $breakpoint-desktop-m) {
    padding: 24px 0 24px 32px;
  }
  /** ESTO PERTENECE AL SCROLL  */
  .nc-product-carousel__scroll {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    align-items: center;
    &__container {
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
      @media (min-width: $breakpoint-desktop-s) {
        display: block;
        position: absolute;
        top: 74px;
        &--left {
          left: 0;
          transform: rotate(90deg);
          margin-left: 20px;
        }
        &--right {
          right: 0;
          transform: rotate(270deg);
          margin-right: 20px;
        }
      }
    }
    /** ESTO PERTENECE AL SCROLL  */

    /** ESTO PERTENECE AL COMPONENTE  */
    &__list {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      list-style: none;
      margin: 0;
      padding: 0;
      @media (min-width: $breakpoint-tablet) {
        flex-direction: row;
      }
      &__item {
        display: flex;
        scroll-snap-align: start;
        margin-bottom: 8px;
        @media (min-width: $breakpoint-tablet) {
          margin-right: 20px;
          &:last-child {
            margin-right: 0;
          }
        }
        @media (min-width: $breakpoint-desktop-m) {
          margin-right: 20px;
          margin-right: 32px;
        }
        .link {
          display: flex;
          text-decoration: none;
          color: #737373;
          &:visited,
          &:hover {
            color: #737373;
          }
          @media (min-width: $breakpoint-tablet) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: 188px;
            min-width: 124px;
            overflow: hidden;
          }
          .item-image-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 118px;
            height: 80px;
            flex-direction: row;
            overflow: hidden;
            @media (min-width: $breakpoint-tablet) {
              width: auto;
              height: 168px;
            }
            .item-image {
              width: 100%;
              @media (min-width: $breakpoint-tablet) {
                height: 100%;
                max-height: 100%;
                width: auto;
              }
            }
          }
        }
      }
    }
    /** ESTO PERTENECE AL COMPONENTE  */
  }
}
</style>
