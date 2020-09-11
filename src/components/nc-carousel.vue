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
          >
            <a :href="item.url" @click="handleClick($event, item.url)"
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
      <a v-if="hasSubtitleLink" :href="url" @click="handleClick($event, url)" class="nc-carousel__secondary-content nc-carousel__secondary-content--link">{{ secondaryText }}</a>
      <p v-else class="nc-carousel__secondary-content">{{ secondaryText }}</p>
    </template>
  </div>
</template>

<script>
import ncCoreCarousel from './nc-core-carousel'

export default {
  name: 'NcCarousel',
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
  computed: {
    hasSubtitleLink() {
      return this.secondaryText !== '' && this.url !== ''
    }
  },
  methods: {
    handleClick(url) {
      this.$emit('on-analytics', { destination: url })
    },
    goToProduct(item) {
      this.$emit('on-analytics', { destination: item.url })
      this.$emit('on-item-click', { id: item.id, url: item.url })
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
        cursor: pointer;
        display: flex;
        text-decoration: none;
        color: #737373;
        &:visited,
        &:hover {
          color: #737373;
        }

        .item-image-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          border-radius: 4px;
          overflow: hidden;
        }

        .item-image {
          border-radius: 4px;
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
          flex-shrink: 0;
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
    #{$ncCarousel}__list {
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;

      &__item {
        width: 28.88vw;
        height: 28.88vw;
        margin: 4px 0;
        overflow: hidden;
        padding: 0;
        justify-content: center;
        border-radius: 4px;
        &:nth-child(3n + 2) {
          margin: 4px 8px;
        }
        &:nth-child(n + 10) {
          display: none;
        }

        .item-image-container {
          width: unset;
          height: unset;
          padding: 0;

          .item-image {
            height: 100%;
            width: auto;
          }
        }
        .item-extra-content {
          display: none;
        }
      }
    }
  }

  @media (min-width: $breakpoint-tablet) {
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 24px 20px 12px;

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

      & &__item {
        margin-bottom: 0;
        margin-right: 0;
        padding: 0 10px;
        &:first-child {
          padding-left: 20px;
        }
        &:last-child {
          padding-right: 20px;
        }

        &__content {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: auto;
          border-radius: 4px;

          .item-image-container {
            .item-image {
              max-height: 100%;
            }
          }
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
          &:nth-child(n + 4) {
            display: block;
          }

          .item-image-container {
            width: auto;
            max-width: 188px;
            min-width: 124px;
            height: $itemHeight;
            margin-right: 0;
          }

          .item-description {
            display: none;
          }

          .item-extra-content {
            position: relative;
            max-width: 188px;
            min-width: 124px;

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
        flex-wrap: nowrap;
        justify-content: flex-start;

        &__item {
          width: auto;
          height: auto;
          margin: 0 !important;
          max-height: $imageSize;
          max-width: $imageSize;
          min-width: $imageSize;

          &:nth-child(n + 10) {
            display: block;
          }

          .item-image-container {
            height: $imageSize;
            max-width: $imageSize;
            width: auto;
          }
        }
      }
    }
  }

  @media (min-width: $breakpoint-desktop-s) {
    padding: 24px 32px 16px;
    box-sizing: border-box;

    &__cards-container {
      order: 2;
    }

    &__secondary-content {
      border-left: 1px solid #d8d8d8;
      border-radius: 0.5px;
      margin-top: 4px;
      margin-left: 8px;
      line-height: unset;
      padding: 6px 0 0 8px;
      width: auto;
    }

    &__cards-container {
      /deep/ {
        .nc-core-carousel {
          &__container {
            margin: 0 -32px;
            flex-grow: 1;
          }
        }
      }
    }

    &__list {
      & &__item {
        padding: 0 16px;

        &:first-child {
          padding-left: 32px;
        }
        &:last-child {
          padding-right: 32px;
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
          .item-image-container {
            height: $itemHeight;
          }
        }
      }
    }

    &--mosaic {
      padding: 24px 0 32px 32px;
    }
  }
}
</style>
