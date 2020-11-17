<template>
  <div class="nc-product-detail">
    <p class="nc-product-detail__title">{{title}}</p>
    <a v-observe-visibility="viewabilityConfig" @viewability-done="handleImpression()" :href="product.url" class="nc-product-detail__content" @click="handleClick($event, product.url, 1, product.__id)">
      <img class="nc-product-detail__image" :src="product.image" :alt="product.name">
      <nc-highlighted :is-highlighted="product.isHighlighted"/>
      <p class="nc-product-detail__description">{{product.name}}</p>
      <p class="nc-product-detail__price">
        <span class="nc-product-detail__price--full-price">{{product.fullPrice}}</span>
        <span class="nc-product-detail__price--sale-price">{{product.salePrice}}</span>
      </p>
    </a>
    <p class="nc-product-detail__subtitle" v-if="!hasLink">{{subtitle}}</p>
    <a class="nc-product-detail__subtitle nc-product-detail__subtitle--link" v-else :href="url" :target="isExternalUrl ? '_blank': '_self'" @click="handleClick($event, url, CONSTANTS.CMS_SUBTITLE_ANALYTICS_NAME)">{{subtitle}}</a>
  </div>
</template>

<script>
import CONSTANTS from '../../tools/constants'
import viewabilityMixin from '../../mixins/viewabilityMixin'
import NcHighlighted from './nc-highlighted'

export default {
  name: 'nc-product-detail',
  components: {
    NcHighlighted
  },
  mixins: [viewabilityMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    product: {
      type: Object,
      default: () => ({})
    },
    isExternalUrl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      CONSTANTS
    }
  },
  computed: {
    hasLink() {
      return !!this.url
    }
  },
  methods: {
    handleClick($event, url, trigger, id = null) {
      $event.preventDefault()
      this.$emit('on-analytics', { trigger, id, url })
      this.$emit('on-navigate', { url, productId: this.product.id })
    },
    handleImpression() {
      this.$emit('on-child-impression', this.product.__id)
    }
  }
}
</script>

<style lang="scss" scoped>
.nc-product-detail {
  background: white;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  height: 100%;

  @media (min-width: $breakpoint-tablet) {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 24px 20px 20px;
  }

  @media (min-width: $breakpoint-desktop-m) {
    padding: 24px 32px 32px;
  }

  &__title {
    color: $color-gray-1;
    $font-size: 20px;
    $line-height: 1.25;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-size: $font-size;
    line-height: $line-height;
    margin: 0 0 12px;
    text-overflow: ellipsis;
    overflow: hidden;

    @media (min-width: $breakpoint-tablet) {
      margin: 0 0 4px;
      height: 2 * $line-height * $font-size;
    }
  }

  &__description {
    $font-size: 15px;
    $line-height: 1.25;
    font-size: $font-size;
    color: $color-gray-2;
    margin: $space-xs 0 0;
    height: 2 * $line-height * $font-size;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    @media (min-width: $breakpoint-tablet) {
      margin: $space-xxs 0 0;
    }
  }

  &__content {
    display: block;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    text-decoration: none;
  }

  &__price {
    margin: 0;
    font-size: 16px;
    &--full-price {
      text-decoration: line-through;
      color: $color-gray-1;
    }
    &--sale-price {
      color: #fa5a5a;
    }
  }

  &__subtitle {
    display: block;
    color: $color-gray-1;
    margin: $space-xs 0 0;
    font-size: 13px;
    &--link {
      text-decoration: none;
      color: #fa5a5a;
    }
  }

  &__image {
    position: relative;
    display: block;
    border-radius: 4px;
    overflow: hidden;
    height: 296px;
    width: auto;
    max-width: 36.25rem;
    margin: auto;
    cursor: pointer;
    @media (min-width: $breakpoint-tablet) {
      height: 260px;
    }

    img {
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }
}
</style>
