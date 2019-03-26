<template>
  <div class="nc-modal" :style="{visibility, display}">
    <div class="nc-modal__overlay">
      <div
        class="nc-modal__container"
        :style="{'margin-top': marginTop, 'width': `${width}px`,  'height': height, 'padding': padding, top, transform}"
      >
        <i v-if="showCloseIcon" class="nc-modal__close-icon fa" @click="close"></i>
        <div class="header" v-if="!hideHeader">
          <slot name="header">header</slot>
        </div>
        <div class="content" :style="{ 'max-height': `${maxHeight}px` }">
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
      default: '588'
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
			transform: 'translate(-50%, -50%)',
			maxHeight: '610px'
    }
  },
  methods: {
    close() {
      this.$emit(close, true)
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
		let headerHeight = document.querySelector('.header').offsetHeight; 
		let padding = parseInt(document.querySelector('.nc-modal__container').style.padding);
		let modalHeight = parseInt(this.height);
		this.maxHeight = modalHeight - (padding + headerHeight);
    if (this.noVerticallyAligned) {
      this.top = '0'
      this.transform = 'translate(-50%, 0)'
    }
  }
}
</script>

<style lang="scss" scoped>
.nc-modal {
  &__overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
  }
  &__close-icon {
    opacity: 0.8;
    position: absolute;
    top: 0.75em;
    right: 0.75em;
    cursor: pointer;
    &:before {
      content: '\f00d';
    }
  }
  &__container {
    max-width: 100%;
    max-height: 100vh;
    overflow: hidden;
    position: fixed;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    & .content {
			height: inherit;
      overflow-y: auto;
    }
		& .footer {
			margin: 10px;
		}
  }
}
</style>
