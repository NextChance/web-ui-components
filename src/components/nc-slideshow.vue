<template>
  <div class="nc-slideshow">
    <div class="nc-slideshow__content" :style="{'width': `${width}px`}">
      <ul class="list" v-touch:swipe="goToSlide"
        :style="{
          width: `${width * slideLength}px`,
          transform: `translate3d(-${slideIndex * width}px, 0px, 0px)`,
          transition: '-webkit-transform 500ms ease'
        }">
        <slot></slot>
      </ul>
    </div>
    <div class="nc-slideshow__pagination">
      <ul class="dots" aria-label="Pagination Slideshow" role="navigation">
        <li 
          :style="paginationStyle" 
          v-for="(i, index) in slideLength" 
          :key=index @click.stop="selectNewSlide(index)" 
          :class="[ slideIndex === index ? paginationActiveClass : '']" 
          role="tab"
          :aria-label="ariaObject.itemIndex + (index + 1)"
          :aria-controls="ariaObject.tabPanel+(index + 1)"
          :aria-selected="slideIndex === index ? true : false"
          :tabindex="slideIndex === index ? -1 : 0"
        >
          <span>{{ ariaText.ariaTextDots + index + 1 }}</span>
        </li>
      </ul>
    </div>
    <a 
      v-if="hasLinkLeft" 
      class="nc-slideshow__link--left" 
      @click="leftLinkHandler($event)" 
      :data-slide-to="slideIndex + 1"
      :style="leftLinkStyle"
      role="button"
    >
      {{ leftLinkText}}
    </a>
    <a 
      v-if="hasLinkRight" 
      class="nc-slideshow__link--right"
      @click="rightLinkHandler($event)" 
      :data-slide-to="slideIndex + 1"
      :style="rightLinkStyle"
      role="button"
    >
      {{ rightLinkText }}
    </a>
  </div>
  
</template>

<script>
/**
 * Code based on https://github.com/myliang/fish-ui/blob/master/src/components/Carousel.vue
 */
export default {
  name: 'nc-slideshow',
  props: {
    paginationActiveClass: {
      type: String,
      default: 'active'
    },
    paginationStyle: {
      type: Object
    },
    hasLinkLeft: {
      type: Boolean,
      default: false
    },
    hasLinkRight: {
      type: Boolean,
      default: false
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
    }
  },
  data() {
    return {
      slideIndex: 0,
      slideLength: 0,
      width: 0,
      ariaObject: {
        itemIndex: 'slide',
        tabPanel: 'tabpanel-0-'
      }
    }
  },
  methods: {
    selectNewSlide(index) {
      this.slideIndex = index
    },
    leftLinkHandler(e) {
      if (this.linksDefaultAction) {
        this.goToSlide('right')
      }
      if (this.slideIndex === 0) {
        this.$emit('slideshow-first-slide', e)
      } else {
        this.$emit('slideshow-click-left-link', e)
      }
    },
    rightLinkHandler(e) {
      if (this.linksDefaultAction) {
        this.goToSlide('left')
      }
      if (this.slideIndex === this.slideLength - 1) {
        this.$emit('slideshow-last-slide', e)
      } else {
        this.$emit('slideshow-click-right-link', e)
      }
    },
    goToSlide(direction) {
      if (direction === 'left') {
        this.slideIndex < this.slideLength - 1
          ? ++this.slideIndex
          : this.slideIndex
      } else {
        this.slideIndex === 0 ? this.slideIndex : --this.slideIndex
      }
    }
  },
  mounted() {
    let _this = this
    this.width = this.$el.offsetWidth
    let slideList = document.querySelectorAll('.list li')
    this.slideLength = slideList.length > 0 ? slideList.length : 0
    slideList.forEach(element => {
      element.style.width = _this.width + 'px'
    })
  }
}
</script>

<style lang="scss" scoped>
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
    height: calc(100% - 20px);
    .list {
      height: 100%;
      position: relative;
      left: 0;
      top: 0;
      display: block;
      list-style: none;
      margin: 0;
      padding: 0;

      .item {
        float: left;
        height: 100%;
        min-height: 1px;
        display: block;

        .image {
          margin: 0 !important;
        }
      }
    }
  }
  &__pagination {
    height: 20px;
    .dots {
      width: 100%;
      margin: 0;
      padding: 0px;
      list-style: none;
      li {
        cursor: pointer;
        height: 8px;
        width: 8px;
        background-color: $dotBackgrounColor;
        border-radius: 50%;
        display: inline-block;
        margin: 0 4px;
        &.active {
          background-color: $dotBackgrounColorActive;
        }
        span {
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
  &__link--left {
    position: absolute;
    margin-left: 13px;
    left: 0;
    bottom: 0;
  }
  &__link--right {
    position: absolute;
    margin-right: 13px;
    right: 0;
    bottom: 0;
  }
}
</style>
