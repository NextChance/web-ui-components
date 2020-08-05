<template>
    <div class="nc-slideshow">
        <ul class="nc-slideshow__content">
            <template>
                <li v-for="(item, index) in images" :key="index" class="nc-slideshow__content__item">
                    <a :href="item.url"><img :src="item.src" :alt="item.alt"></a>
                </li>
            </template>
        </ul>
        <template v-if="hasSlideNavigation">
            <button class="nc-slideshow__button nc-slideshow__button--left">left</button>
            <button class="nc-slideshow__button nc-slideshow__button--right">right</button>
        </template>
        <template v-if="hasSlideNavigation">
            <div class="nc-slideshow__dots">
                <span v-for="(dot, indexDot) in images" :key="`dot-${indexDot}`"></span>
            </div>
        </template>
    </div>
</template>

<script>
export default {
  name: 'nc-slideshow-v2',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasSlideNavigation() {
      return this.images.length > 1
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.nc-slideshow {
  box-sizing: border-box;
  max-width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  &__content {
    white-space: nowrap;
    list-style: none;
    padding: 0;
    margin: 0;
    &__item {
      width: 100%;
      display: inline-block;
      img {
        width: 100%;
      }
    }
  }

  &__button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    &--right {
      right: 0;
    }
  }

  &__dots {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    bottom: 12px;
    span {
      cursor: pointer;
      height: 10px;
      width: 10px;
      background-color: white;
      border-radius: 50%;
      display: inline-block;
      &:nth-child(2) {
        margin-left: 8px;
      }
    }
  }
}
</style>
