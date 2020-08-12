<template>
  <div class="nc-featured-grid">
    <p class="nc-featured-grid__title">{{title}}</p>
    <ul class="nc-featured-grid__content">
      <li v-for="(item, index) in items" :key="`grid-item-${index}`" class="nc-featured-grid__content__item">
        <a :href="item.url" class="nc-featured-grid__content__item__link">
          <img :src="item.image.src" :alt="item.image.alt">
        </a>
        <p class="nc-featured-grid__content__item__caption">{{item.caption}}</p>
      </li>
    </ul>
    <p v-if="!hasSubtitleLink" class="nc-featured-grid__subtitle">{{subtitle}}</p>
    <a v-else :href="url" class="nc-featured-grid__subtitle nc-featured-grid__subtitle--link">{{subtitle}}</a>
  </div>
</template>

<script>
export default {
  name: 'nc-featured-grid',
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
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasSubtitleLink() {
      return this.subtitle !== '' && this.url !== ''
    }
  }
}
</script>

<style lang="scss" scoped>
$breakpoint-tablet: 768px;
$breakpoint-desktop-s: 1024px;
$breakpoint-desktop-m: 1366px;
$color-coral: #fa5a5a;
.nc-featured-grid {
  background: white;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  @media (min-width: $breakpoint-tablet) {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 20px 24px 24px;
  }

  &__title {
    font-size: 16px;
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

  &__subtitle {
    font-size: 13px;
    margin: 12px 0 0;
    max-height: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    &--link {
      color: #fa5a5a;
      text-decoration: none;
    }
  }

  &__content {
    list-style: none;
    padding: 0;
    margin: 0;
    &__item {
      box-sizing: border-box;
      display: inline-block;
      width: 50%;
      &:nth-child(odd) {
        padding-right: 8px;
        @media (min-width: $breakpoint-tablet) {
          padding-right: 4px;
        }
      }
      &:nth-child(even) {
        padding-left: 8px;
        @media (min-width: $breakpoint-tablet) {
          padding-left: 4px;
        }
      }
      &:nth-child(n + 3) {
        margin-top: 8px;
        @media (min-width: $breakpoint-tablet) {
          margin-top: 4px;
        }
      }
      &__link {
        display: block;
        height: 120px;
        overflow: hidden;
        border-radius: 4px;
        img {
          display: block;
          height: 100%;
        }
      }

      &__caption {
        font-size: 13px;
        height: 32px;
        margin: 4px 0 0;
      }
    }
  }
}
</style>
