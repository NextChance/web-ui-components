<template>
  <div
    v-show="active"
    class="nc-loader"
    :style="[hasVeil ? { background: veilColor } : '']"
  >
    <div class="nc-loader__container">
      <div class="nc-loader__icon" :style="{ color: iconColor }">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        v-show="hasText"
        class="nc-loader__text"
        :style="{ color: textColor }"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nc-loader',
  props: {
    /**
     * Text to display  below spinner
     */
    text: {
      type: String
    },
    /**
     * loading state, true if it is displayed
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * text state true if it is displayed
     */
    hasText: {
      type: Boolean,
      default: false
    },
    /**
     * veil state true if it is displayed
     */
    hasVeil: {
      type: Boolean,
      default: false
    },
    /**
     * custom veil color
     */
    veilColor: {
      type: String,
      default: '#FFF'
    },
    /**
     * custom text color
     */
    textColor: {
      type: String,
      default: '#272727'
    },
    /**
     * custom icon color
     */
    iconColor: {
      type: String,
      default: '#272727'
    }
  }
}
</script>

<style scoped lang="scss">
.nc-loader {
  width: 100%;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    .nc-loader__icon {
      display: inline-block;
      position: relative;
      width: 64px;
      height: 64px;

      div {
        transform-origin: 32px 32px;
        animation: nc-loader__icon 1.2s linear infinite;
        color: #272727;
        &:after {
          content: ' ';
          display: block;
          position: absolute;
          top: 3px;
          left: 29px;
          width: 5px;
          height: 14px;
          border-radius: 20%;
          background-color: currentColor;
        }
        &:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -1.1s;
        }
        &:nth-child(2) {
          transform: rotate(30deg);
          animation-delay: -1s;
        }
        &:nth-child(3) {
          transform: rotate(60deg);
          animation-delay: -0.9s;
        }
        &:nth-child(4) {
          transform: rotate(90deg);
          animation-delay: -0.8s;
        }
        &:nth-child(5) {
          transform: rotate(120deg);
          animation-delay: -0.7s;
        }
        &:nth-child(6) {
          transform: rotate(150deg);
          animation-delay: -0.6s;
        }
        &:nth-child(7) {
          transform: rotate(180deg);
          animation-delay: -0.5s;
        }
        &:nth-child(8) {
          transform: rotate(210deg);
          animation-delay: -0.4s;
        }
        &:nth-child(9) {
          transform: rotate(240deg);
          animation-delay: -0.3s;
        }
        &:nth-child(10) {
          transform: rotate(270deg);
          animation-delay: -0.2s;
        }
        &:nth-child(11) {
          transform: rotate(300deg);
          animation-delay: -0.1s;
        }
        &:nth-child(12) {
          transform: rotate(330deg);
        }

        animation-delay: 0s;
      }

      @keyframes nc-loader__icon {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    }

    .nc-loader__text {
      margin-top: 20px;
      color: #272727;
      font-size: 12px;
    }
  }
}
</style>
