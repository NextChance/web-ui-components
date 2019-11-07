<template>
  <div class="nc-modal">
    <div class="nc-modal__overlay" @click="handleCloseModal">
      <div class="nc-modal__container" @click.stop.prevent>
        <img
          v-if="!hideCloseIcon"
          src="data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiMyNzI3MjciIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE5IDYuNEwxNy42IDUgMTIgMTAuNiA2LjQgNSA1IDYuNGw1LjYgNS42TDUgMTcuNiA2LjQgMTlsNS42LTUuNiA1LjYgNS42IDEuNC0xLjQtNS42LTUuNnoiLz4KPC9zdmc+Cg=="
          class="nc-modal__close-icon"
          @click="handleCloseModal"
        />
        <header v-if="hasHeader" ref="header" class="nc-modal__header">
          <div class="header-slot">
            <slot name="header"></slot>
          </div>
        </header>
        <section class="content">
          <slot name="content"></slot>
        </section>
        <footer v-if="hasFooter" ref="footer" class="nc-modal__footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nc-modal',
  props: {
    hideCloseIcon: {
      type: Boolean,
      default: false
    },
    hasHeader: {
      type: Boolean,
      default: false
    },
    hasFooter: {
      type: Boolean,
      default: false
    },
    closeEventName: {
      type: String,
      default: 'close'
    }
  },

  methods: {
    handleCloseModal() {
      this.$emit(this.closeEventName, true)
    }
  }
}
</script>

<style lang="scss" scoped>
$close-icon-size: 24px;
$gutter: 1rem;
$breakpoint-tablet: 768px;

.nc-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;

  &__overlay {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__container {
    border-radius: 8px;
    position: relative;
    background-color: white;
    height: auto;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    box-shadow: 0 2px 54px 0 rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: 0 2px 54px 0 rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0 2px 54px 0 rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    @media (min-width: $breakpoint-tablet) {
      max-height: 60%;
    }

    .content {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      padding: 0 $gutter;
      box-sizing: border-box;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    position: relative;
    padding: $gutter;
    flex-shrink: 0;
    min-height: $close-icon-size;

    .header-slot {
      flex-grow: 1;
      margin-right: $close-icon-size;
    }
  }

  &__footer {
    padding: $gutter;
    flex-shrink: 0;
    min-height: $close-icon-size;
  }

  &__close-icon {
    position: absolute;
    top: $gutter;
    right: $gutter;
    width: $close-icon-size;
    cursor: pointer;
    z-index: 100;
  }
}
</style>
