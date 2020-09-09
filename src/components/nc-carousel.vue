<template>
  <div :class="['nc-carousel', isMosaicType ? 'nc-carousel--mosaic' : 'nc-carousel--list' ]">
    <p class="nc-carousel__title">{{ title }}</p>
    <nc-core-carousel :list-length="items.length" :buttons-position="buttonsPosition" class="nc-carousel__cards-container">
      <template>
        <ul
            ref="carouselContent"
            class="nc-carousel__list"
        >
          <li
              v-for="(item, index) in items"
              :key="`carousel-${index}`"
              class="nc-carousel__list__item"
          >
            <div class="image-shadow"></div>
            <a :href="item.url" @click="handleClick($event, item.url)"
               class="nc-carousel__list__item__content">
              <div class="item-image-container" ref="carouselImage">
                <img :src="item.image.src" :alt="item.image.alt" class="item-image">
              </div>
              <div class="item-extra-content">
                <div class="item-description">
                  {{ item.title }}
                </div>
                <span class="item-caption item-caption--first">{{ item.firstText }}</span>
                <span class="item-caption item-caption--second">{{ item.secondText }}</span>
              </div>
            </a>
          </li>
        </ul>
      </template>
    </nc-core-carousel>
    <div class="nc-carousel__secondary-content">
      <p v-if="!hasSubtitleLink" class="nc-carousel__secondary-content__text">{{ secondaryText }}</p>
      <a v-else :href="url" @click="handleClick($event, url)" class="nc-carousel__secondary-content__text nc-carousel__secondary-content__text--link">{{ secondaryText }}</a>
    </div>
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
  data() {
    return {
      buttonsPosition: ''
    }
  },
  computed: {
    hasSubtitleLink() {
      return this.secondaryText !== '' && this.url !== ''
    }
  },
  mounted() {
    window.addEventListener('resize', this.initializeValues)
    this.initializeValues()
  },
  methods: {
    handleClick(url) {
      this.$emit('on-analytics', { destination: url })
    },
    initializeValues() {
      if (this.$refs.carouselImage && this.$refs.carouselImage.length > 0) {
        this.buttonsPosition = `${this.$refs.carouselImage[0].offsetHeight *
          0.44}px`
      }
    },
    goToProduct(item) {
      this.$emit('on-analytics', { destination: item.url })
      this.$emit('on-item-click', { id: item.id, url: item.url })
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initializeValues)
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
    font-size: $font-size;
    color: #272727;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 2 * $line-height * $font-size;
    margin-bottom: 12px;
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
          .item-image {
            border-radius: 4px;
            height: 100%;
            width: auto;
          }
        }
      }
    }
  }


  &__secondary-content {
    p {
      margin: 0;
    }
    padding-top: 16px;

    &__text {
      font-size: 13px;
      width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #272727;
      line-height: 1;

      &--link {
        color: #fa5a5a;
        display: block;
        text-decoration: none;
      }
    }
  }


  &--list {
    #{$ncCarousel}__list {
      &__item {
        margin-bottom: 8px;
        &:nth-child(n + 4) {
          display: none;
        }
        &:nth-child(3n) {
          margin-bottom: 0;
        }

        .image-shadow {
          top: 166px;
        }

        .item-image-container {
          width: 118px;
          min-width: 118px;
          height: 80px;
          margin-right: 12px;
        }

        .item-extra-content {
          width: 100%;
          padding-top: 12px;

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

          .item-description {
            $font-size: 13px;
            $line-height: 1.25;
            font-size: $font-size;
            max-height: 2 * $line-height * $font-size;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            min-width: 198px;
            padding-bottom: 4px;
          }
        }
      }

    }
  }

  &--mosaic {
    #{$ncCarousel}__list {
      flex-wrap: wrap;
      flex-direction: row;

      &__item {
        width: 27.6vw;
        height: 27.6vw;
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

        .image-shadow {
          top: 187px;
        }
        .item-image-container {
          width: unset;
          height: unset;
          padding: 0;

          .item-image {
            width: auto;
            height: 100%;
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
    padding: 24px 0 12px 22px;

    &__title {
      margin-right: 0;
      display: block;
      -webkit-line-clamp: unset;
      -webkit-box-orient: unset;
      white-space: nowrap;
      max-width: 411px;
    }

    &__list {
      flex-direction: row;

      &__item {
        margin-bottom: 0;

        .image-shadow {
          position: absolute;
          height: 2px;
          width: 100%;
          z-index: 8;
          opacity: 0.1;
          background-image: linear-gradient(
                  to bottom,
                  rgba(115, 115, 115, 0),
                  rgba(115, 115, 115, 0.98) 46%,
                  #737373 1%
          );
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

    &--list {
      #{$ncCarousel}__list {
        &__item {
          margin-right: 20px;

          &:last-child {
            margin-right: 0;
          }

          &:nth-child(n + 4) {
            display: block;
          }

          .item-image-container {
            width: auto;
            max-width: 188px;
            min-width: 124px;
            height: 168px;
            margin-right: 0;
          }

          .item-description {
            display: none;
          }
        }
      }
    }

    &--mosaic {
      padding: 24px 0 12px 20px;

      #{$ncCarousel}__list {
        flex-wrap: nowrap;

        &__item {
          width: auto;
          height: auto;
          margin: 0 16px 0 0;
          max-height: 189px;
          max-width: 189px;
          min-width: 189px;

          &:last-child {
            margin-right: 0;
          }

          &:nth-child(3n + 2) {
            margin: 0 16px 0 0;
          }

          &:nth-child(n + 10) {
            display: block;
          }

          .item-image-container {
            height: 189px;
            width: auto;
          }
        }
      }
    }
  }

  @media (min-width: $breakpoint-desktop-s) {
    padding: 24px 0 16px 20px;
    box-sizing: border-box;

    &__cards-container {
      order: 2;
    }

    &__secondary-content {
      height: 22px;
      margin-top: 4px;
      padding: 0 0 0 8px;
      line-height: unset;
      width: auto;

      &__text {
        border-left: 1px solid #d8d8d8;
        border-radius: 0.5px;
        padding-left: 8px;
        padding-top: 4px;

        &--link {
          padding-left: 8px;
          padding-top: 6px;
        }
      }
    }

    &--list {
      #{$ncCarousel}__list {
        &__item {
          margin-right: 32px;
        }
      }
    }

    &--mosaic {
      padding: 24px 0 20px 32px;
    }
  }

  @media (min-width: $breakpoint-desktop-m) {
    padding: 24px 0 24px 32px;

    &--list {
      #{$ncCarousel}__list {
        &__item {
          .image-shadow {
            top: 170px;
          }

          .item-image-container {
            height: 172px;
          }
        }
      }
    }

    &--mosaic {
      padding: 24px 0 32px 32px;

      #{$ncCarousel}__list {
        &__item {
          margin: 0 20px 0 0;
        }
      }
    }
  }
}
</style>
