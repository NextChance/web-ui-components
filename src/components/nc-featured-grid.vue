<template>
  <div class="nc-featured-grid">
    <p class="nc-featured-grid__title">{{title}}</p>
    <ul class="nc-featured-grid__content">
      <li v-for="(item, index) in items" :key="`grid-item-${index}`" class="nc-featured-grid__content__item">
        <a :href="item.url" :target="item.isExternalUrl ? '_blank': '_self'" @click="handleClick(item.url)" class="nc-featured-grid__content__item__link">
          <img :src="item.image.src" :alt="item.image.alt">
        </a>
        <p class="nc-featured-grid__content__item__caption">{{item.caption}}</p>
      </li>
    </ul>
    <p v-if="!hasSubtitleLink" class="nc-featured-grid__subtitle">{{subtitle}}</p>
    <a v-else :href="url" @click="handleClick(url)" class="nc-featured-grid__subtitle nc-featured-grid__subtitle--link">{{subtitle}}</a>
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
  },
  methods: {
    handleClick(url) {
      this.$emit('on-analytics', { destination: url })
    }
  }
}
</script>

<style lang="scss" scoped>
.nc-featured-grid {
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
    padding: 24px 32px 20px;
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
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: $breakpoint-tablet) {
      height: 2 * $line-height * $font-size;
      margin: 0 0 4px;
    }
  }

  &__subtitle {
    display: block;
    font-size: 13px;
    margin: 12px 0 0;
    height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: $space-unit 0 0;
    @media (min-width: $breakpoint-tablet) {
      margin: $space-mdl 0 0;
    }
    &--link {
      color: #fa5a5a;
      text-decoration: none;
    }
  }

  &__content {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    &__item {
      box-sizing: border-box;
      width: 50%;
      &:nth-child(odd) {
        padding-right: 8px;
        @media (min-width: $breakpoint-tablet) {
          padding-right: 4px;
        }
      }

      &:nth-child(odd) {
        padding-right: 4px;
      }

      &:nth-child(even) {
        padding-left: 4px;
      }

      &:nth-child(n + 3) {
        margin-top: 8px;
        @media (min-width: $breakpoint-tablet) {
          margin-top: 4px;
        }
      }

      &__link {
        border-radius: 4px;
        display: block;
        height: 120px;
        margin: auto;
        max-width: 12.75rem;
        overflow: hidden;
        position: relative;

        @media (min-width: $breakpoint-desktop-m) {
          height: 124px;
        }

        img {
          display: block;
          height: 100%;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%) translateX(-50%);
        }
      }

      &__caption {
        $font-size: 15px;
        $line-height: 1.25;
        color: $color-gray-2;
        font-size: $font-size;
        line-height: $line-height;
        margin: 4px auto 0;
        max-width: 12.75rem;
        webkit-box-orient: vertical;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;

        @media (min-width: $breakpoint-tablet) {
          max-height: 2 * $font-size * $line-height;
        }
      }
    }
  }
}
</style>
