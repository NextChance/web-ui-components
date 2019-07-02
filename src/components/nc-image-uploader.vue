<template>
  <div class="image-uploader__container">
    <div class="box">
      <input 
        id="imageUploader" 
        type="file" 
        name="imageUploader" 
        class="image-uploader_input" 
        data-multiple-caption="{count} files selected" 
        multiple
        @change="handleFileChange"
        :disabled="isDisabled"
        >
      <label 
        for="imageUploader"
        :class="['nc-image-uploader_background','nc-uploader_label', error ? error : '']"
        :style="{ 
          borderRadius: radius,
          height: imageUploaderHeight,
          width: imageUploaderWidth,
          backgroundImage: `url(${bgImage})`
        }"
        >
            <figure v-if="isEmpty"
            :style="{
            height: iconHeight,
            width: iconWidth,
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
    iconHeight: {
      type: String,
      default: '24px'
    },
    iconWidth: {
      type: String,
      default: '24px'
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
      if (!files.length)
        return
      this.$emit('input-image-uploader-event', files[0])
      this.isEmpty = false
      this.isLoading = true
      this.isDisabled = true
      this.withData = false
      this.error = ''
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

        if(newImage !== '') {
          this.isEmpty = false
          this.isLoading = false
          this.isDisabled = false
          this.withData = true
        } else {
          this.isEmpty = true
          this.isLoading = false
          this.isDisabled = true
          this.withData = false
        }
    }
  }
}
</script>
<style lang="scss">
  $containerBorderColor: #ccc;
  $errorColor: red;

.image-uploader_input {
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
}
.image-uploader_input + .nc-uploader_label {
  border: 1px solid $containerBorderColor;
  cursor: pointer;
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 700;
  overflow: hidden;
  padding: 0.625rem 1.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
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

