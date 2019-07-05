<template>
  <div class="image-uploader__container" :style="{width: imageUploaderWidth}">
    <div class="box">
      <label
        :class="['nc-image-uploader_background','nc-uploader_label', error ? error : '']"
        :style="{
          borderRadius: radius,
          height: imageUploaderHeight,
          backgroundImage: `url(${bgImage})`
        }"
        >
            <figure v-if="isEmpty"
            :style="{
              transform: emptyIconScale
            }">
              <slot name="isEmptyState">
                <!-- icon for empty input -->
              </slot>
            </figure>
            <figure v-if="isLoading"
              :style="{
                transform: loaderIconScale,
                height: loaderIconHeigth,
                width: loaderIconWidth
              }">
              <slot name="isLoadingState">
                <!-- icon for loading -->
              </slot>
            </figure>
            <figure
              v-if="withData"
              @click="handleClickRemove">
              <slot
                name="withDataState"
                >
                <!-- icon for with a background-image -->
              </slot>
            </figure>
            <input
              :id="id"
              type="file"
              class="image-uploader_input"
              @change="handleFileChange"
              >
        </label>
      </div>
    <div
      class="image-uploader__error"
      v-if="error"
      :style="{ 'color': errorColor }"
    >
      {{ $t(error) }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'nc-image-uploader',
  props: {
    id: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    errorColor: {
      type: String,
      default: '$errorColor'
    },
    bgImage: {
      type: String,
      default: ''
    },
    containerBorderColor: {
      type: String,
      default: '$containerBorderColor'
    },
    loaderIconHeigth: {
      type: String,
      default: '20px'
    },
    loaderIconScale: {
      type: String,
      default: 'scale(0.5)'
    },
    loaderIconWidth: {
      type: String,
      default: '20px'
    },
    emptyIconScale: {
      type: String,
      default: 'scale(0.5)'
    },
    imageUploaderHeight: {
      type: String,
      default: 'auto'
    },
    imageUploaderWidth: {
      type: String,
      default: 'auto'
    },
    radius: {
      type: String,
      default: '4px'
    }
  },
  data () {
    return {
      isDisabled: false,
      isEmpty: true,
      isLoading: false,
      withData: false
    }
  },

  methods: {
    handleFileChange(ev) {
      const files = ev.target.files || ev.dataTransfer.files
        if (files.length > 0) {
          this.$emit('input-image-uploader-event', {file: files[0], imgId: this.id})
          this.isEmpty = false
          this.isLoading = true
          this.isDisabled = true
          this.withData = false
          this.error = ''
        }
    },
    handleClickRemove: function (ev) {
      this.bgImage = ''
      this.isEmpty = true
      this.isLoading = false
      this.isDisabled = false
      this.withData = false
      this.error = 'error'
    }
  },
  watch: {
    bgImage: function(newImage, oldImage) {
      this.isEmpty = true
      this.isLoading = false
      this.isDisabled = true
      this.withData = false

      if(newImage !== '') {
        this.isEmpty = false
        this.isLoading = false
        this.isDisabled = false
        this.withData = true
      }
    }
  }
}
</script>
<style lang="scss">
  $containerBorderColor: #ccc;
  $errorColor: red;

.image-uploader__container {
  position: relative;
  padding: 0 2px 0 0px;
}
.image-uploader_input {
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
}
.nc-uploader_label {
  position: relative;
  border: 1px solid $containerBorderColor;
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
   &.error {
      border: 1px solid $errorColor;
  }
}
.nc-image-uploader_background {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.image-uploader__error {
  color: $errorColor
}
</style>
