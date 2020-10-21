<template>
  <div :class="['nc-carousel', isMosaicType ? 'nc-carousel--mosaic' : 'nc-carousel--list' ]">
    <p class="nc-carousel__title">{{ title }}</p>
    <nc-core-carousel :list-length="items.length" class="nc-carousel__cards-container">
      <template>
        <ul class="nc-carousel__list">
          <li
              v-for="(item, index) in items"
              :key="`carousel-${index}`"
              class="nc-carousel__list__item"
              v-observe-visibility="viewabilityConfig" @viewability-done="handleImpression(item)"
          >
            <a :href="item.url" @click="handleClick($event, item, index + 1, item.__id || item.id)"
               class="nc-carousel__list__item__content">
              <div class="item-image-container" ref="carouselImage">
                <img :src="item.image.src" :alt="item.image.alt" class="item-image">
              </div>
              <div class="item-extra-content">
                <div class="item-description">
                  {{ item.title }}
                </div>
                <div>
                  <span class="item-caption item-caption--first">{{ item.firstText }}</span>
                  <span class="item-caption item-caption--second">{{ item.secondText }}</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </template>
    </nc-core-carousel>
    <template v-if="secondaryText">
      <a v-if="hasSubtitleLink" :href="url" @click="handleClick($event, {url}, CONSTANTS.CMS_SUBTITLE_ANALYTICS_NAME)" class="nc-carousel__secondary-content nc-carousel__secondary-content--link">{{ secondaryText }}</a>
      <p v-else class="nc-carousel__secondary-content">{{ secondaryText }}</p>
    </template>
  </div>
</template>

<script>
import ncCoreCarousel from './nc-core-carousel'
import CONSTANTS from '../../tools/constants'

import viewabilityMixin from '../../mixins/viewabilityMixin'

export default {
  name: 'NcCarousel',
  mixins: [viewabilityMixin],
  components: {
    ncCoreCarousel
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
    secondaryText: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    isMosaicType: {
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
    hasSubtitleLink() {
      return this.secondaryText !== '' && this.url !== ''
    }
  },
  methods: {
    handleClick($event, item, trigger, id = null) {
      $event.preventDefault()
      const payload = { url: item.url, productId: item.id }
      this.$emit('on-analytics', { trigger, id })
      this.$emit('on-navigate', payload)
    },
    handleImpression(item) {
      this.$emit('on-child-impression', item.__id || item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.nc-carousel {
  $ncCarousel: &;
  background: white;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;

  &__title {
    $font-size: 20px;
    $line-height: 1.25;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #272727;
    display: -webkit-box;
    font-size: $font-size;
    max-height: 2 * $line-height * $font-size;
    margin: 0 0 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__secondary-content {
    margin: 0;

    color: #272727;
    font-size: 13px;
    line-height: 1;
    overflow: hidden;
    padding-top: 16px;
    text-overflow: ellipsis;
    width: 180px;
    white-space: nowrap;

    &--link {
      color: #fa5a5a;
      display: block;
      text-decoration: none;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;

    &__item {
      position: relative;
      display: flex;
      scroll-snap-align: start;

      &__content {
        color: #737373;
        cursor: pointer;
        display: flex;
        text-decoration: none;

        &:visited,
        &:hover {
          color: #737373;
        }

        .item-image-container {
          display: flex;
          justify-content: center;
          border-radius: 4px;
          overflow: hidden;
        }

        .item-image {
          border-radius: 4px;
          display: block;
          flex-shrink: 0;
          height: 100%;
          width: auto;
        }
      }
    }
  }

  &--list {
    #{$ncCarousel}__list {
      &__item {
        flex-shrink: 0;
        margin-bottom: 8px;
        &:nth-child(n + 4) {
          display: none;
        }
        &:nth-child(3n) {
          margin-bottom: 0;
        }

        .item-image-container {
          flex-shrink: 0;
          height: 80px;
          margin-right: 12px;
          width: 118px;
        }

        .item-extra-content {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          padding-top: 12px;
          width: 100%;

          .item-caption {
            font-size: 16px;

            &--first {
              padding-right: 4px;
              text-decoration: line-through;
              color: #272727;
            }

            &--second {
              padding-left: 4px;
              font-size: 16px;
              color: #fa5a5a;
            }
          }
        }

        .item-description {
          $font-size: 13px;
          $line-height: 1.25;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          font-size: $font-size;
          max-height: 2 * $line-height * $font-size;
          overflow: hidden;
          padding-bottom: 4px;
          text-overflow: ellipsis;
        }
      }
    }
  }

  &--mosaic {
    width: 100%;
    #{$ncCarousel}__list {
      width: fit-content;
      margin: auto;
      display: grid;
      grid-template-rows: repeat(3, 28.88vw);
      grid-template-columns: repeat(3, minmax(28%, 28.88vw));
      grid-gap: 8px;

      &__item {
        width: auto;
        overflow: hidden;
        padding: 0;
        border-radius: 4px;
        &:nth-child(n + 10) {
          display: none;
        }

        &__content {
          display: block;
          height: 100%;
          width: 100%;
        }

        .item-image-container {
          height: 100%;
          padding: 0;
          width: 100%;
        }

        .item-extra-content {
          display: none;
        }
      }
    }
  }

  @media (min-width: $breakpoint-tablet) {
    $componentPadding: 20px;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 24px $componentPadding 12px;

    &__title {
      margin-right: 0;
      display: block;
      -webkit-line-clamp: unset;
      -webkit-box-orient: unset;
      white-space: nowrap;
      max-width: 411px;
    }

    &__list {
      align-items: flex-start;
      flex-direction: row;

      &__item {
        margin-bottom: 0;
        margin-right: 0;

        &:first-child {
          padding-left: $componentPadding;
        }

        &:last-child {
          padding-right: $componentPadding;
        }

        &__content {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: auto;
          border-radius: 4px;
        }
      }
    }

    &__secondary-content {
      padding-top: 8px;
      line-height: 16px;
      width: 100%;
      height: 16px;
    }

    &__cards-container {
      /deep/ {
        .nc-core-carousel {
          &__container {
            margin: 0 -20px;
            flex-grow: 1;
          }
        }
      }
    }

    &--list {
      $itemHeight: 168px;
      /deep/ {
        .nc-core-carousel {
          &__button {
            top: $itemHeight/2;
            bottom: unset;
            margin: 0;
            transform: translateY(-50%);
          }
        }
      }
      #{$ncCarousel}__list {
        &__item {
          padding: 0 10px;

          &:nth-child(n + 4) {
            display: block;
          }

          .item-image-container {
            height: $itemHeight;
            min-width: 124px;
            margin-right: 0;
            max-width: 188px;
            width: auto;
          }

          .item-description {
            display: none;
          }

          .item-extra-content {
            flex-shrink: 0;
            max-width: 188px;
            min-width: 124px;
            position: relative;

            &:before {
              background-image: linear-gradient(
                to bottom,
                rgba(115, 115, 115, 0),
                rgba(115, 115, 115, 0.98) 46%,
                #737373 1%
              );
              content: '';
              height: 2px;
              opacity: 0.1;
              position: absolute;
              top: 0;
              width: 100%;
            }
          }
        }
      }
    }

    &--mosaic {
      $imageSize: 189px;
      #{$ncCarousel}__list {
        grid: unset;
        grid-gap: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: nowrap;
        justify-content: flex-start;

        &__item {
          padding: 0 8px;
          flex-shrink: 0;
          justify-content: center;
          height: auto;
          margin: 0 !important;
          width: auto;
          &:first-child {
            padding-left: $componentPadding;
          }

          &:nth-child(n + 10) {
            display: block;
          }

          .item-image-container {
            height: $imageSize;
            width: $imageSize;
          }
        }
      }
    }
  }

  @media (min-width: $breakpoint-desktop-s) {
    $componentPadding: 32px;
    padding: 24px $componentPadding 16px;
    box-sizing: border-box;

    &__cards-container {
      order: 2;
    }

    &__secondary-content {
      border-left: 1px solid #d8d8d8;
      border-radius: 0.5px;
      margin-left: 8px;
      line-height: unset;
      padding: 6px 0 0 8px;
      width: auto;
    }

    &__cards-container {
      /deep/ {
        .nc-core-carousel {
          &__container {
            margin: 0 -1 * $componentPadding;
            flex-grow: 1;
          }
        }
      }
    }

    &__list {
      & &__item {
        &:first-child {
          padding-left: $componentPadding;
        }
        &:last-child {
          padding-right: $componentPadding;
        }
      }
    }
  }

  @media (min-width: $breakpoint-desktop-m) {
    padding: 24px 32px 24px;

    &--list {
      $itemHeight: 172px;
      /deep/ {
        .nc-core-carousel {
          &__button {
            top: $itemHeight/2;
          }
        }
      }
      #{$ncCarousel}__list {
        &__item {
          padding: 0 16px;

          .item-image-container {
            height: $itemHeight;
          }
        }
      }
    }

    &--mosaic {
      #{$ncCarousel}__list {
        &__item {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
