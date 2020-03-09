<template>
  <div :class="['nc-card-item', wrapperClass]">
    <div
      class="clickable"
      @click="handleCardItemClicked($event)"
      :ref="cardItemReference"
    >
      <div class="nc-card-item__image">
        <img
          v-if="image"
          alt="imageAlt"
          class="nc-card-item__image__content"
          :src="image"
          :style="imageStyle"
          @error="handleImageError">
        <div class="nc-card-item__image__extra-content--top" v-if="$slots['imageExtraContentTop']">
          <slot name="imageExtraContentTop" />
        </div>
        <div class="nc-card-item__image__extra-content--bottom" v-if="$slots['imageExtraContentBottom']">
          <slot name="imageExtraContentBottom" />
        </div>
      </div>
      <div
        class="nc-card-item__content"
        :style="contentStyle"
      >
        <div class="nc-card-item__header" v-if="header">
          <slot name="headerExtraContent"></slot>
          {{ header }}
        </div>
        <div class="nc-card-item__subheader" v-if="subheader">
          <slot name="subheaderExtraContent"></slot>
          {{ subheader }}
        </div>
        <div
          class="nc-card-item__title"
          :style="{ '-webkit-line-clamp': titleLineEllipsis }"
          v-if="title"
        >
          {{ title }}
        </div>
        <div
          class="nc-card-item__description"
          v-if="description"
          :style="{ '-webkit-line-clamp': descriptionLineEllipsis }"
        >{{ description }}</div>
      </div>
    </div>
    <div
      class="nc-card-item__extra-content"
      v-if="hasExtraContent"
      :style="extraContentStyle"
    >
      <slot name="extraContent"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nc-card-item',
  props: {
    cardItemReference: {
      type: String,
      default: 'cardItemRef'
    },
    contentStyle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    descriptionLineEllipsis: {
      type: Number,
      default: 3
    },
    extraContentStyle: Object,
    hasExtraContent: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: 'Default image'
    },
    imageStyle: Object,
    subheader: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleLineEllipsis: {
      type: Number,
      default: 2
    },
    wrapperClass: {
      type: String,
      default: ''
    },
    hasImageExtraContentTop: {
      type: Boolean,
      default: false
    },
    hasImageExtraContentBottom: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCardItemClicked: function(ev) {
      this.$emit('card-item-click-event', ev)
    },
    handleImageError(ev) {
      this.$emit('image-error', ev)
    }
  }
}
</script>

<style lang="scss">
.nc-card-item {
  width: 100%;
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;

  & .clickable {
    cursor: pointer;
  }

  &__image {
    position: relative;
    &__extra-content {
      &--top {
        position: absolute;
        top: 8px;
        left: 8px;
      }
      &--bottom {
        position: absolute;
        bottom: 8px;
        right: 8px;
      }
    }
    &__content {
      height: 100%;
      width: 100%;
      object-fit: cover;

      @media all and (-ms-high-contrast: none) {
        width: auto;
      }
    }
  }
  &__content {
    padding: 11px 24px 24px 24px;
    display: flex;
    flex-flow: wrap;
  }
  &__header {
    margin-right: 8px;
  }
  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    flex-basis: 100%;
  }
  &__subheader {
    display: flex;
  }
  &__description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    flex-basis: 100%;
  }
}
</style>
