<template>
  <div class="nc-featured-detail">
    <p class="nc-featured-detail__title">{{title}}</p>
    <a class="nc-featured-detail__link" :href="url" :target="isExternalUrl ? '_blank': '_self'" @click="handleClick($event, url, 1)">
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
        default: () => ({})
      },
      isExternalUrl: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleClick($event, url, position) {
        $event.preventDefault()
        this.$emit('on-analytics', { position })
        this.$emit('on-navigate', url)
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

    &__link {
      position: relative;
      display: block;
      border-radius: 4px;
      overflow: hidden;
      height: 330px;
      width: 100%;
      max-width: 36.25rem;
      margin: auto;
      @media (min-width: $breakpoint-tablet) {
        height: 340px;
      }

      &__image {
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
      }
    }
  }
</style>
