<template>
  <div class="nc-featured-detail">
    <p class="nc-featured-detail__title">{{title}}</p>
    <a class="nc-featured-detail__link" v-observe-visibility="viewabilityConfig" @viewability-done="handleImpression()" :href="itemUrl" :target="isExternalUrl ? '_blank': '_self'" @click="handleClick($event, itemUrl, 1, elementId)">
      <nc-lazy-image class="nc-featured-detail__link__image" :src="image.src" :alt="image.alt" />
    </a>
    <a v-if="hasSubtitleLink" :href="url" @click="handleClick($event, url, CONSTANTS.CMS_SUBTITLE_ANALYTICS_NAME)" class="nc-featured-detail__subtitle nc-featured-detail__subtitle--link">{{subtitle}}</a>
    <p v-else class="nc-featured-detail__subtitle">{{subtitle}}</p>
  </div>
</template>

<script>
import CONSTANTS from '../../tools/constants'
import viewabilityMixin from '../../mixins/viewabilityMixin'
import NcLazyImage from './nc-lazy-image'

export default {
  name: 'nc-featured-detail',
  mixins: [viewabilityMixin],
  components: {
    NcLazyImage
  },
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
    },
    subtitle: {
      type: String,
      default: ''
    },
    itemUrl: {
      type: String,
      default: ''
    },
    elementId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      CONSTANTS
    }
  },
  computed: {
    hasSubtitleLink() {
      return this.subtitle !== '' && this.url !== ''
    }
  },
  methods: {
    handleClick($event, url, trigger, elementId = null) {
      $event.preventDefault()
      this.$emit('on-analytics', { trigger, id: elementId, url })
      this.$emit('on-navigate', url)
    },
    handleImpression() {
      this.$emit('on-child-impression', this.elementId)
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

  &__subtitle {
    display: block;
    color: $color-gray-1;
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
      margin: $space-xs 0 0;
    }
    &--link {
      color: #fa5a5a;
      text-decoration: none;
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
      height: 324px;
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
