<template>
  <div v-show="active" :class="{ veil: hasVeil }" class="nc-spinner-container">
    <div class="nc-spinner-content">
      <div class="nc-spinner-spinner">
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
      <div v-show="hasText" class="nc-spinner-text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nc-spinner",
  props: {
    /**
     * Text to display  below spinner
     */
    text: {
      type: String,
      default: "loading"
    },
    /**
     * loading state, true if it is displayed
     */
    active: {
      type: Boolean,
      default: true
    },
    /**
     * text state true if it is displayed
     */
    hasText: {
      type: Boolean,
      default: true
    },
    /**
     * veil state true if it is displayed
     */
    hasVeil: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped lang="scss">
.nc-spinner-container {
  width: 100%;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.veil {
    background:#FFF;
  }

  .nc-spinner-content {
    .nc-spinner-spinner {
      color: official;
      display: inline-block;
      position: relative;
      width: 64px;
      height: 64px;

      div {
        transform-origin: 32px 32px;
        animation: nc-spinner-spinner 1.2s linear infinite;
        &:after {
          content: " ";
          display: block;
          position: absolute;
          top: 3px;
          left: 29px;
          width: 5px;
          height: 14px;
          border-radius: 20%;
          background: #272727;
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

      @keyframes nc-spinner-spinner {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    }

    .nc-spinner-text {
      color: #272727;
      font-size: 12px;
    }
  }
}
</style>
