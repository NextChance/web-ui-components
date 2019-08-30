<template>
  <div
  :class="['nc-coupon-item', wrapperClass]"
  :ref="couponItemReference"
  @click="handleCouponItemClicked($event)"
  >
    <div class="nc-coupon-item__image">
      <img
        v-if="image"
        alt="imageAlt"
        class="nc-coupon-item__image-content"
        :src="image"
        :style="imageStyle"
        @error="handleImageError">
      <div
        v-if="caption"
        class="nc-coupon-item__image-caption"
        :style="captionStyle"
      >
        {{ caption }}
      </div>
    </div>
    <div
      class="nc-coupon-item__content"
      :style="contentStyle"
    >
      <div
        v-if="name"
        class="nc-coupon-item__content-name"
        :style="{ '-webkit-line-clamp': nameLineEllipsis }"
      >
        {{ name }}
      </div>
      <div
        v-if="description"
        class="nc-coupon-item__content-description"
        :style="{ '-webkit-line-clamp': descriptionLineEllipsis }"
      >
        {{ description }}
      </div>
      <div
        v-if="totalPrice && discountedPrice"
        class="nc-coupon-item__content-discount"
      >
        <div class="nc-coupon-item__content-discount--old">
          {{ totalPrice }}
        </div>
        <div class="nc-coupon-item__content-discount--new">
          {{ discountedPrice }}
        </div>
      </div>
      <div
        v-else
        class="nc-coupon-item__content-discount"
      >
        <div class="nc-coupon-item__content-discount--new">
          {{ discount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nc-coupon-item',
  props: {
    couponItemReference: {
      type: String,
      default: 'couponItemRef'
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
    caption: {
      type: String,
      default: 'Caption'
    },
    captionStyle: Object,
    contentStyle: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    nameLineEllipsis: {
      type: Number,
      default: 1
    },
    description: {
      type: String,
      default: 'Description'
    },
    descriptionLineEllipsis: {
      type: Number,
      default: 3
    },
    discount: {
      type: String
    },
    totalPrice: {
      type: String
    },
    discountedPrice: {
      type: String
    },
    wrapperClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleCouponItemClicked: function(ev) {
      this.$emit('coupon-item-click-event', ev)
    },
    handleImageError(ev) {
      this.$emit('image-error', ev)
    }
  }
}
</script>

<style lang="scss">
.nc-coupon-item {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: row;
  &__image {
    position: relative;
    width: 40%;
    &-content {
      width: 100%;
      img {
        margin: 0 auto;
        position: absolute;
        left: 0;
        right: 0;
        height: 100%;
        width: auto;
      }
    }
  }
  &__content {
    padding: 16px;
    display: flex;
    width: 60%;
    flex-flow: wrap;

    &-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    &-description {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    &-discount {
      width: 60%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }
  }
}
</style>
