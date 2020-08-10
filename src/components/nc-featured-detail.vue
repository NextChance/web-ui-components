<template>
  <div class="nc-featured-detail">
    <p class="nc-featured-detail__title">{{title}}</p>
    <a class="nc-featured-detail__link" :href="element.url">
      <img :src="element.image.src" class="nc-featured-detail__link__image" :alt="element.image.alt">
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
    element: {
      type: Object,
      default: () => {
        return {
          url: '',
          caption: '',
          image: {
            src: '',
            alt: ''
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$breakpoint-tablet: 768px;
$breakpoint-desktop-s: 1024px;
$breakpoint-desktop-m: 1366px;
.nc-featured-detail {
  background: white;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;

  @media (min-width: $breakpoint-tablet) {
    border-radius: 8px;
    padding: 20px 24px 24px;
  }

  &__title {
    margin: 0 0 12px;
    max-height: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    @media (min-width: $breakpoint-tablet) {
      margin: 0 0 4px;
    }
  }

  &__link {
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
      height: 100%;
    }
  }
}
</style>
