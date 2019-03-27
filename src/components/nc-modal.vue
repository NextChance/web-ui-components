<template>
  <div class="nc-modal" :style="{visibility, display}">
    <div class="nc-modal__overlay">
      <div
        class="nc-modal__container"
        :style="{'margin-top': marginTop, 'padding': padding, 'width': widthByDevice, 'height': heightByDevice, top, left, transform}"
      >
        <i v-if="showCloseIcon" class="nc-modal__close-icon fa" @click="close"></i>
        <div class="header" v-if="!hideHeader">
          <slot name="header">header</slot>
        </div>
        <div class="content" :style="{ 'height': contentHeight }">
          <slot name="content">
            <p>Content</p>
          </slot>
        </div>
        <div class="footer" v-if="!hideFooter">
          <slot name="footer">
            <div @click="close">OK</div>
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
    hideHeader: {
      type: Boolean,
      defeault: false
    },
    hideFooter: {
      type: Boolean,
      defeault: false
    },
    padding: {
      type: String,
      default: '20px'
    },
    marginTop: {
      type: String,
      default: '0'
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
    }
  },

  data() {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      contentHeight: '610px',
      widthByDevice: '',
      heightByDevice: ''
    }
  },

  methods: {
    close() {
      this.$emit(close, true)
    },

    calculateContentHeight() {
			debugger;
      let headerHeight = document.querySelector('.header').offsetHeight
      let padding = parseInt(
        document.querySelector('.nc-modal__container').style.padding
      )
      let modalHeight = parseInt(this.height)
      this.contentHeight = modalHeight - (padding + headerHeight) +  'px';
    },

    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth
    },

    getDesktopDevice() {
      return this.windowWidth > 768 ? true : false
    },

    resizeModal() {
      this.getWindowWidth()
      this.isDesktopDevice = this.getDesktopDevice()
      if (!this.isDesktopDevice) {
        let padding = parseInt(this.padding) * 2
        this.top = '0'
        this.left = '0'
        this.transform = 'translate(0, 0)'
        this.widthByDevice = `calc(100vw - ${padding}px)`
				this.heightByDevice = '100%'
				this.contentHeight = 'auto'
      } else {
        this.top = '50%'
        this.left = '50%'
        this.transform = 'translate(-50%, -50%)'
        this.heightByDevice = this.height
				this.widthByDevice = this.width
				this.calculateContentHeight()
      }
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
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.resizeModal)
      this.calculateContentHeight()
      this.resizeModal()
      if (this.noVerticallyAligned) {
        this.top = '0'
        this.transform = 'translate(-50%, 0)'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
/*media query breaks*/
$break-mobile: 768px;
$break-desktop: 769px;

.nc-modal {
  &__overlay {
    position: absolute;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    @media (min-width: $break-desktop) {
			position: fixed;
    }
  }
  &__close-icon {
    opacity: 0.8;
    position: absolute;
    cursor: pointer;
    top: 21px;
    right: 25px;
    &:before {
      content: '\f00d';
    }
    @media (min-width: $break-desktop) {
    	top: 30px;
    	right: 30px;
    }
  }
  &__container {
    max-width: 100vw;
    max-height: 100vh;
    top: 0;
    left: 0;
    transform: translate('0', '0');
    position: relative;
    background-color: #fff;
    font-family: Helvetica, Arial, sans-serif;
		overflow: auto;
		/* desktop, specific styles */
    @media (min-width: $break-desktop) {
    	top: 50%;
    	left: 50%;
    	transform: translate('-50%', '-50');
    	position: fixed;
			overflow: hidden;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
			& .content {
				overflow-y: auto;
			}
    }
    & .content {
      width: 100%;
    }
    & .footer {
      margin: 10px;
    }
  }
}
</style>
