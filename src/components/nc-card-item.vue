<template>
  <div 
  :class="['nc-card-item', wrapperClass]"
  @click="handleCardItemClicked($event)"
  :ref="cardItemReference"
  >
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
      <div 
        class="title"
        :style="{ '-webkit-line-clamp': titleLineEllipsis }"
        v-if="title"
      >
        {{ title }}
      </div>
      <div 
        class="description" 
        v-if="description"
        :style="{ '-webkit-line-clamp': descriptionLineEllipsis }"
      >{{ description }}</div>
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
    caption: {
      type: String,
      default: 'Caption'
    },
    captionStyle: Object,
    contentStyle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: 'Description'
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
    titleLineEllipsis: {
      type: Number,
      default: 2
    },
    wrapperClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleCardItemClicked: function(ev) {
      this.$emit('card-item-click-event', ev)
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
    display: flex;
    flex-flow: wrap;
    & .header {
      margin-right: 8px;
    }
    & .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      flex-basis: 100%;
    }
    & .description {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      flex-basis: 100%;
    }
  }
}
</style>
