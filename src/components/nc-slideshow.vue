<template>
  <div class="nc-slideshow">
    <div class="nc-slideshow__content" :style="{'width': `${width}px`}">
      <ul class="list"
          v-touch:swipe.right="previousSlide"
          v-touch:swipe.left="nextSlide"
          :style="{
          width: `${width * slideLength}px`,
          transform: `translate3d(-${slideIndex * width}px, 0, 0)`,
          transition: 'transform 500ms ease'
        }">
        <template v-if="srcSets.length">
          <li v-for="(image, index) in srcSets" :key="index" class="list__item" :style="defaultImage && !loadedImages[index] ? `background-image: url(${defaultImage})` : ''">
            <img class="image" :src="image.smallest" :srcset="image.srcSet" @error="setErrorImage" @load="setImageLoaded(index)" :alt="alt">
          </li>
        </template>
        <template v-else>
          <li class="list__item list__item--placeholder" :style="defaultImage ? `background-image: url(${defaultImage})` : ''">
          </li>
        </template>
      </ul>
    </div>
    <template v-if="srcSets.length > 1" >
      <div class="nc-slideshow__pagination">
        <ul class="dots" aria-label="Pagination Slideshow" role="navigation">
          <li
              :style="paginationStyle"
              v-for="(i, index) in slideLength"
              :key=index
          >
            <button
                @click.stop="selectSlide(index)"
                :class="[ slideIndex === index ? paginationActiveClass : '', 'dots__button']"
            >
              <span class="dots__text">{{ ariaText.ariaTextDots + index + 1 }}</span>
            </button>
          </li>
        </ul>
      </div>
      <button
          v-if="!hideButtons && hasLinkLeft"
          class="nc-slideshow__link--left"
          @click="leftLinkHandler($event)"
          :data-slide-to="slideIndex + 1"
          :style="leftLinkStyle"
          role="button"
      >
        <slot name="imageButtonIconLeft" />
        {{ leftLinkText }}
      </button>
      <button
          v-if="!hideButtons && hasLinkRight"
          class="nc-slideshow__link--right"
          @click="rightLinkHandler($event)"
          :data-slide-to="slideIndex + 1"
          :style="rightLinkStyle"
          role="button"
      >
        <slot name="imageButtonIconRight" />
        {{ rightLinkText }}
      </button>
    </template>
  </div>
</template>

<script>
  /**
   * Code based on https://github.com/myliang/fish-ui/blob/master/src/components/Carousel.vue
   */
  export default {
    name: 'nc-slideshow',
    data() {
      return {
        slideIndex: 0,
        slideLength: 0,
        width: 0,
        ariaObject: {
          itemIndex: 'slide',
          tabPanel: 'tabpanel-0-'
        },
        slideList: '',
        loadedImages: []
      }
    },
    props: {
      paginationActiveClass: {
        type: String,
        default: 'active'
      },
      paginationStyle: {
        type: Object
      },
      leftLinkText: {
        type: String,
        default: 'Previous'
      },
      rightLinkText: {
        type: String,
        default: 'Next'
      },
      linksDefaultAction: {
        type: Boolean,
        default: false
      },
      leftLinkStyle: {
        type: Object
      },
      rightLinkStyle: {
        type: Object
      },
      ariaText: {
        type: Object,
        default: function() {
          return {
            ariaTextDots: 'Slide'
          }
        }
      },
      images: {
        type: Array,
        default: () => []
      },
      srcSets:  {
        type: Array,
        default: () => []
      },
      defaultImage: {
        type: String,
        default: ''
      },
      errorImage: {
        type: String,
        default: ''
      },
      hideButtons: {
        type: Boolean,
        default: false
      },
      alt: {
        type: String,
        default: ''
      }
    },
    computed: {
      hasLinkLeft() {
        return this.slideIndex > 0
      },
      hasLinkRight() {
        return this.slideIndex < this.slideLength - 1
      }
    },
    methods: {
      selectSlide(index) {
        this.slideIndex = index
      },
      leftLinkHandler(ev) {
        if (this.linksDefaultAction) {
          this.previousSlide()
        }
        if (this.slideIndex === 0) {
          this.$emit('slideshow-first-slide', ev)
        } else {
          this.$emit('slideshow-click-left-link', ev)
        }
      },
      rightLinkHandler(ev) {
        if (this.linksDefaultAction) {
          this.nextSlide()
        }
        if (this.slideIndex === this.slideLength - 1) {
          this.$emit('slideshow-last-slide', ev)
        } else {
          this.$emit('slideshow-click-right-link', ev)
        }
      },
      nextSlide() {
        let nextSlideIndex = this.slideIndex
        if (this.slideIndex < this.slideLength - 1) {
          ++nextSlideIndex
        }
        this.slideIndex = nextSlideIndex
      },
      previousSlide() {
        let nextSlideIndex = this.slideIndex
        if (this.slideIndex > 0) {
          --nextSlideIndex
        }
        this.slideIndex = nextSlideIndex
      },
      resizeSlide() {
        this.width = this.$el.offsetWidth
        this.slideList.forEach(element => {
          element.style.width = this.width + 'px'
        })
      },
      setErrorImage(ev) {
        ev.target.src = this.errorImage
        ev.target.srcset = this.errorImage
      },
      setImageLoaded(imageIndex) {
        this.$set(this.loadedImages, imageIndex, true)
      }
    },
    mounted() {
      window.addEventListener('resize', this.resizeSlide)
      this.slideList = document.querySelectorAll('.list li')
      this.slideLength = this.slideList.length || 0
      setTimeout(this.resizeSlide, 0)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeSlidel)
    }
  }
</script>

<style scoped lang="scss">
  $dotBackgrounColor: #d8d8d8;
  $dotBackgrounColorActive: #ff7f3f;
  .nc-slideshow {
    position: relative;
    display: block;
    box-sizing: border-box;
    height: 100%;

    &__content {
      position: relative;
      overflow: hidden;
      display: block;
      margin: 0;
      padding: 0;
      height: 100%;

      .list {
        height: 100%;
        position: relative;
        left: 0;
        top: 0;
        display: block;
        list-style: none;
        margin: 0;
        padding: 0;

        &__item {
          align-items: center;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          display: flex;
          float: left;
          height: 100%;
          min-height: 1px;

          &--placeholder {
            width: 100%;
            height: 100%;
            background-size: cover;
          }

          .image {
            display: block;
            width: 100%;

            @media all and (-ms-high-contrast: none) {
              width: auto;
            }
          }
        }
      }
    }

    &__pagination {
      height: 20px;

      .dots {
        width: 100%;
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          height: 8px;
          width: 8px;
          margin: 0 4px;
          display: inline-block;

          & .dots__button {
            cursor: pointer;
            height: 8px;
            width: 8px;
            background-color: $dotBackgrounColor;
            border-radius: 50%;
            padding: 0;
            border: none;

            &.active {
              background-color: $dotBackgrounColorActive;
            }
          }

          & .dots__text {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }
        }
      }
    }

    &__link--left,
    &__link--right {
      border: none;
      background: none;
      position: absolute;
      margin-left: 13px;
      bottom: 0;
    }

    &__link--left {
      left: 0;
    }

    &__link--right {
      right: 0;
    }
  }
</style>
