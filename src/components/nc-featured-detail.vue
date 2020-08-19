<template>
  <div class="nc-featured-detail">
    <p class="nc-featured-detail__title">{{title}}</p>
    <a class="nc-featured-detail__link" :href="url" @click="handleClick(url)">
      <img :src="image.src" class="nc-featured-detail__link__image" :alt="image.alt">
    </a>
  </div>
</template>

<script>
export default {
  name: 'nc-featured-detail',
  props: {
    title: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClick(url) {
      this.$emit('on-analytics', { destination: url })
    }
  }
}
</script>

<style lang="scss" scoped>
.nc-featured-detail {
  background: white;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;

  @media (min-width: $breakpoint-tablet) {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 24px 20px 20px;
  }

  @media (min-width: $breakpoint-desktop-m) {
    padding: 24px 32px 32px;
  }

  &__title {
    margin: 0 0 12px;
    height: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;

    @media (min-width: $breakpoint-tablet) {
      margin: 0 0 4px;
    }
  }

  &__link {
    position: relative;
    display: block;
    border-radius: 4px;
    overflow: hidden;
    height: 330px;
    width: 100%;

    @media (min-width: $breakpoint-tablet) {
      height: 340px;
    }

    &__image {
      width: 100%;
      height: unset;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
