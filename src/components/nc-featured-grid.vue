<template>
  <div class="nc-featured-grid">
    <p class="nc-featured-grid__title">{{title}}</p>
    <ul class="nc-featured-grid__content">
      <li v-observe-visibility="viewabilityConfig" @viewability-done="handleImpression(item)" v-for="(item, index) in items" :key="`grid-item-${index}`" class="nc-featured-grid__content__item">
        <a :href="item.url" :target="item.isExternalUrl ? '_blank': '_self'" @click="handleClick($event, item.url, index+1, item.id)" class="nc-featured-grid__content__item__link">
          <div class="nc-featured-grid__content__item__detail">
            <nc-lazy-image 
              :src="item.image.src" 
              :alt="item.image.alt" 
              :placeholder="placeholderImage" 
              :error="errorImage" 
              :srcSets="srcSets"
            />
          </div>
          <p class="nc-featured-grid__content__item__caption">{{item.caption}}</p>
        </a>
      </li>
    </ul>
    <p v-if="!hasSubtitleLink" class="nc-featured-grid__subtitle">{{subtitle}}</p>
    <a v-else :href="url" @click="handleClick($event, url, CONSTANTS.CMS_SUBTITLE_ANALYTICS_NAME)" class="nc-featured-grid__subtitle nc-featured-grid__subtitle--link">{{subtitle}}</a>
  </div>
</template>

<script>
import CONSTANTS from '../../tools/constants'
import viewabilityMixin from '../../mixins/viewabilityMixin'
import NcLazyImage from './nc-lazy-image'

export default {
  name: 'nc-featured-grid',
  mixins: [viewabilityMixin],
  components: {
    NcLazyImage
  },
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
    },
    placeholderImage: {
      type: String,
      default: ''
    },
    errorImage: {
      type: String,
      default: ''
    },
    srcSets: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasSubtitleLink() {
      return this.subtitle !== '' && this.url !== ''
    }
  },
  data() {
    return {
      CONSTANTS
    }
  },
  methods: {
    handleClick($event, url, trigger, elementId = null) {
      $event.preventDefault()
      this.$emit('on-analytics', { trigger, id: elementId, url })
      this.$emit('on-navigate', url)
    },
    handleImpression(item) {
      this.$emit('on-child-impression', item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ {
  .nc-lazy-image__image {
    width: unset;
    border-radius: 4px;
    display: block;
    height: 100%;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    object-fit: unset;
  }
}
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
      margin: $space-xxs 0 0;
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
        text-decoration: none;
      }

      &__detail {
        display: block;
        height: 120px;
        margin: auto;
        max-width: 12.75rem;
        overflow: hidden;
        position: relative;
        border-radius: 4px;

        @media (min-width: $breakpoint-desktop-m) {
          height: 124px;
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
          height: 2 * $font-size * $line-height;
        }
      }
    }
  }
}
</style>
