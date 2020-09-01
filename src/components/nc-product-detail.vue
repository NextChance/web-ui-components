<template>
  <div class="nc-product-detail">
    <p class="nc-product-detail__title">{{title}}</p>
    <div class="nc-product-detail__image" @click="goToProduct">
      <img :src="product.image" :alt="product.name">
    </div>
    <p class="nc-product-detail__description">{{product.name}}</p>
    <p class="nc-product-detail__price">
      <span class="nc-product-detail__price--full-price">{{product.fullPrice}}</span>
      <span class="nc-product-detail__price--sale-price">{{product.salePrice}}</span>
    </p>
    <p class="nc-product-detail__subtitle" v-if="!hasLink">{{subtitle}}</p>
    <a class="nc-product-detail__subtitle nc-product-detail__subtitle--link" v-else :href="url" :target="isExternalUrl ? '_blank': '_self'" @click="handleClick(url)">{{subtitle}}</a>
  </div>
</template>

<script>
export default {
  name: 'nc-product-detail',
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
    }
  },
  computed: {
    hasLink() {
      return !!this.url
    }
  },
  methods: {
    handleClick(url) {
      this.$emit('on-analytics', { destination: url })
    },
    goToProduct() {
      this.$emit('on-image-click')
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
    max-height: 2 * $line-height * $font-size;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    @media (min-width: $breakpoint-tablet) {
      margin: $space-xxs 0 0;
      max-height: 2 * $line-height * $font-size;
    }
  }

  &__price {
    margin: 0;
    font-size: 16px;
    &--full-price {
      color: $color-gray-1;
    }
    &--sale-price {
      color: #fa5a5a;
    }
  }

  &__subtitle {
    color: $color-gray-1;
    margin: $space-unit 0 0;
    font-size: 13px;
    @media (min-width: $breakpoint-tablet) {
      margin: $space-unit 0 0;
    }
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
    width: 100%;
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
