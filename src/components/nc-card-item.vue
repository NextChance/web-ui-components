<template>
  <div 
  :class="['nc-card-item', wrapperClass]">
    <div class="nc-card-item__image">
      <img 
        :src="image" 
        alt="imageAlt" 
        class="image-content"
        :style="imageStyle"
        v-if="image">
      <div 
        :class="caption" 
        :style="captionStyle"
        v-if="caption"
      >
        {{ caption }}
      </div>
    </div>
    <div 
      class="nc-card-item__content"
      :style="contentStyle"
    >
      <div class="header" v-if="header">{{ header }}</div>
      <div class="subheader" v-if="subheader">{{ subheader }}</div>
      <div class="title" v-if="title">{{ title }}</div>
      <div class="description" v-if="description">{{ description }}</div>
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
    caption: {
      type: String,
      default: 'Caption'
    },
    captionStyle: Object,
    contentStyle: {
      type: String,
      default: ''
    },
    extraContentStyle: Object,
    description: {
      type: String,
      default: 'Description'
    },
    hasExtraContent: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: 'Header'
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
      default: 'Subheader'
    },
    title: {
      type: String,
      default: 'Title'
    },
    wrapperClass: {
      type: String,
      default: ''
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
  &__image {
    position: relative;
    .image-content {
      width: 100%;
    }
  }
  &__content {
    padding: 11px 24px 24px 24px;
    & .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    & .description {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
