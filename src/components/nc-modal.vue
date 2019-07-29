<template>
  <div class="nc-modal" :style="{visibility, display}">
    <div class="nc-modal__overlay" :style="overlayStyle">
      <div
        class="nc-modal__container"
        :style="{'padding': padding, 'width': widthByDevice, 'height': heightByDevice, 'background-color': backgroundColor}"
      >
        <img v-if="showCloseIcon" src="@/assets/svg/close.svg"  class="nc-modal__close-icon" @click="handleCloseModal" />
        <div
          v-if="showHeader"
          ref="header"
          class="nc-modal__header"
          :style="{'z-index':zIndexHeader}"
        >
          <slot name="header">header</slot>
        </div>
        <div class="content" :style="{ 'height': contentHeight, 'padding-top': paddingTop }">
          <slot name="content">
            <p>Content</p>
          </slot>
        </div>
        <div
          v-if="showFooter"
          ref="footer"
          class="nc-modal__footer"
        >
          <slot name="footer">
            <div @click="handleCloseModal">OK</div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const close = 'close'

export default {
  name: 'nc-modal',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    showCloseIcon: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    padding: {
      type: String,
      default: '20px'
    },
    width: {
      type: String,
      default: '588px'
    },
    height: {
      type: String,
      default: '630px'
    },
    noVerticallyAligned: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    overlayStyle: {
      type: Object
    },
    zIndexHeader: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      paddingTop: '0',
      contentHeight: '0',
      widthByDevice: '',
      heightByDevice: ''
    }
  },

  methods: {
    handleCloseModal() {
      this.$emit(close, true)
    },

    calculateContentHeight() {
      if (this.opened) {
        const headerHeight = this.$refs.header ? this.$refs.header.offsetHeight : 0
        const footerHeight = this.$refs.footer ? this.$refs.footer.offsetHeight : 0

        this.contentHeight = `calc(${this.height} - ${headerHeight + footerHeight}px)`
      }
    },

    calculateTopPadding() {
      if (this.opened) {
        const headerHeight = this.$refs.header ? this.$refs.header.offsetHeight : 16
        this.topPadding = `${headerHeight}px`
      }
    },

    updateWindowWidth() {
      return document.documentElement.clientWidth
    },

    getDesktopDevice() {
      return this.updateWindowWidth() > 768 ? true : false
    },

    resizeModal() {
      this.isDesktopDevice = this.getDesktopDevice()
      if (!this.isDesktopDevice) {
        const padding = parseInt(this.padding) * 2
        this.widthByDevice = `calc(100vw - ${padding}px)`
        this.heightByDevice = document.documentElement.clientHeight - parseInt(padding) + 'px'
      } else {
        this.heightByDevice = this.height
        this.widthByDevice = this.width
      }
      this.calculateContentHeight()
      this.calculateTopPadding()
    }
  },
  computed: {
    visibility() {
      return this.opened ? 'visible' : 'hidden'
    },
    display() {
      return this.opened ? 'block' : 'none'
    }
  },
  watch: {
    opened() {
      this.calculateContentHeight()
      this.calculateTopPadding()
    }
  },
  mounted() {
    this.calculateContentHeight()
    this.calculateTopPadding()
    this.$nextTick(function() {
      window.addEventListener('resize', this.resizeModal)
    })
  },
  updated() {
    this.$nextTick(function() {
      if (this.opened) {
        this.resizeModal()
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeModal)
  }
}
</script>

<style lang="scss">
/*media query breaks*/
$break-mobile: 768px;
$break-desktop: 769px;

.nc-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  &__overlay {
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  & .header svg,
  &__close-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    opacity: .8;
    width: 24px;
    cursor: pointer;
    @media (min-width: $break-desktop) {
      top: 30px;
      right: 30px;
    }
  }
  &__container {
    font-family: Helvetica, Arial, sans-serif;
    box-sizing: content-box;
    @media (min-width: $break-desktop) {
      border-radius: 2px;
       box-shadow: 0 2px 54px 0 rgba(0, 0, 0, .12);
      -webkit-box-shadow: 0 2px 54px 0 rgba(0, 0, 0, .12);
      -moz-box-shadow: 0 2px 54px 0 rgba(0, 0, 0, .12);
      transition: all .3s ease;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    &__header {
      padding: 60px 30px 0 30px;
      margin-bottom: 16px;
      background-color: #ffffff;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: auto;

      @media (min-width: $break-desktop) {
        padding: 30px;
        position: relative;
      }
    }

    & .content {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      width: 100%;
    }
    @media (min-width: $break-desktop) {
      overflow: hidden;
      overflow-y: scroll;
    }

    &__footer {
      background-color: #ffffff;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 14px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;

      & .bh-button {
        padding: 3px;
      }
    }
  }
}
</style>
