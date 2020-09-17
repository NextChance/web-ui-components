<template>
  <div class="nc-card">
    <div class="nc-card__header">
      <div
          v-if="$slots['topLeftCorner']"
          class="nc-card__header__top-left-corner"
      >
        <slot name="topLeftCorner" />
      </div>
      <bh-lazy-image
          class="nc-card__image"
          :src="src"
          :alt="alt"
      />
      <div
          v-if="$slots['bottomLeftCorner']"
          class="nc-card__header__bottom-left-corner"
      >
        <slot name="bottomLeftCorner" />
      </div>
      <div
          v-if="$slots['bottomRightCorner']"
          class="nc-card__header__bottom-right-corner"
      >
        <slot name="bottomRightCorner" />
      </div>
    </div>
    <div class="nc-card__main">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import BhLazyImage from '~/components/BhLazyImage.vue'
export default {
  name: 'BhCard',
  components: {
    BhLazyImage
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.nc-card {
  border-radius: $border-radius-l;
  box-shadow: $box-shadow-medium;
  box-sizing: border-box;
  font-family: $font-circular-book;
  width: 100%;
  height: auto;
  overflow: hidden;

  &__header {
    position: relative;

    &::after {
      background-image: linear-gradient(
        to bottom,
        rgba(get-color('billionhands', 'gray-2'), 0) 0%,
        rgba(get-color('billionhands', 'gray-2'), 0.15) 25%
      );
      bottom: 0;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    &__top-left-corner,
    &__bottom-right-corner,
    &__bottom-left-corner {
      position: absolute;
      z-index: 1;
    }

    &__top-left-corner {
      top: $space-xs;
      left: $space-xs;
    }

    &__bottom-left-corner {
      bottom: $space-xs;
      left: $space-xs;
    }

    &__bottom-right-corner {
      bottom: $space-xs;
      right: $space-xs;
    }
  }

  &__main {
    padding: $space-sm;
  }
}
@media (min-width: $breakpoint-tablet) {
  .nc-card {
    &__main {
      padding: $space-unit;
    }
  }
}
</style>
