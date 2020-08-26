<template>
  <div class="nc-carousel">
    <p class="nc-carousel__title">{{ title }}</p>
    <nc-core-carousel :list-length="items.length" class="nc-carousel__cards-container">
      <template>
        <ul
          ref="carouselList"
          class="nc-carousel__list"
        >
          <li
            v-for="(item, index) in items"
            :key="`product-carousel-${index}`"
            class="nc-carousel__list__item"
          >
            <div class="image-shadow"></div>
            <a :href="item.url" @click="handleClick(item.url)" 
            class="link">
              <div class="item-image-container">
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
      <template v-if="hasSecondaryText">
        <p v-if="secondaryText" class="nc-carousel__secondary-content__text">{{ secondaryText }}</p>
        <a v-else :href="url" @click="handleClick(url)" class="nc-carousel__secondary-content__text nc-carousel__secondary-content__text--link">{{ url }}</a>
      </template>
    </div>
  </div>
</template>

<script>
import ncCoreCarousel from './nc-core-carousel'

export default {
  name: 'NcListCarousel',
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
    }
  },
  computed: {
    hasSecondaryText() {
      return this.url || this.secondaryText
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
.nc-carousel {
  background: white;
  box-sizing: border-box;
  padding: 16px;
  width: calc(100% - 32px);
  @media (min-width: $breakpoint-tablet) {
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 24px 0 12px 22px;
  }

  @media (min-width: $breakpoint-desktop-s) {
    padding: 24px 0 16px 20px;
    box-sizing: border-box;
  }

  @media (min-width: $breakpoint-desktop-m) {
    padding: 24px 0 24px 32px;
  }
  &__title {
    font-size: 16px;
    color: #272727;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 40px;
    margin-bottom: 12px;
    @media (min-width: $breakpoint-tablet) {
      margin-right: 0;
    }
    @media (min-width: $breakpoint-desktop-s) {
      max-width: 496px;
      display: block;
      -webkit-line-clamp: unset;
      -webkit-box-orient: unset;
      white-space: nowrap;
    }
  }
  &__cards-container {
    @media (min-width: $breakpoint-desktop-s) {
      order: 2;
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
    @media (min-width: $breakpoint-tablet) {
      flex-direction: row;
    }
    &__item {
      position: relative;
      display: flex;
      scroll-snap-align: start;
      margin-bottom: 8px;
      &:nth-child(n + 4) {
        display: none;
      }
      @media (min-width: $breakpoint-tablet) {
        margin-bottom: 0;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
        &:nth-child(n+4) {
          display: block;
        }
        .image-shadow {
          position: absolute;
          top: 166px;
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
      }
      @media (min-width: $breakpoint-desktop-m) {
        margin-right: 20px;
        margin-right: 32px;
      }
      .link {
        display: flex;
        text-decoration: none;
        color: #737373;
        &:visited,
        &:hover {
          color: #737373;
        }
        @media (min-width: $breakpoint-tablet) {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: auto;
          border-radius: 4px;
        }
        .item-image-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 118px;
          min-width: 118px;
          height: 80px;
          flex-direction: row;
          margin-right: 12px;
          border-radius: 4px;
          overflow: hidden;
          @media (min-width: $breakpoint-tablet) {
            width: auto;
            max-width: 188px;
            min-width: 124px;
            height: 168px;
            margin-right: 0;
          }
          .item-image {
            border-radius: 4px;
            height: 100%;
            width: auto;
            @media (min-width: $breakpoint-tablet) {
              max-height: 100%;
            }
          }
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
            min-width: 198px;
            padding-bottom: 4px;
            max-height: 32px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 13px;
            @media (min-width: $breakpoint-tablet) {
              display: none;
            }
          }
        }
      }
    }
  }
  &__secondary-content {
    padding-top: 4px;
    @media (min-width: $breakpoint-tablet) {
      line-height: 16px;
      width: 100%;
      height: 16px;
    }

    @media (min-width: $breakpoint-desktop-s) {
      height: 22px;
      padding: 0 0 0 12px;
      line-height: unset;
      width: auto;
    }

    &__text {
      font-size: 13px;
      color: #272727;
      p {
        margin: 0;
      }
      @media (min-width: $breakpoint-desktop-s) {
        border-left: 1px solid #d8d8d8;
        border-radius: 0.5px;
        padding-left: 12px;
        padding-top: 2px;
        margin-top: 4px;
      }
      &--link {
        color: #fa5a5a;
        display: block;
        padding-left: 12px;
        padding-top: 2px;
        text-decoration: none;
      }
    }
  }
}
</style>
