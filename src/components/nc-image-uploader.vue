<template>
  <div class="image-uploader__container">
    <div class="box">
      <input 
        id="imageUploader" 
        type="file" 
        name="imageUploader[]" 
        class="image-uploader_input image-uploader_input-4" 
        data-multiple-caption="{count} files selected" 
        multiple=""
        @change="onFileChange"
        :disabled="isDisabled"
        >
      <label 
        for="imageUploader"
        class="nc-image-uploader_background"
        :style="{ 
          borderRadius: radius,
          imageUploaderheight: imageUploaderheight,
          imageUploaderwidth: imageUploaderwidth,
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
              @click="removeImage">
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
    bgImage: {
      type: String,
      default: ''
    },
    borderStyle: {
      type: String,
      default: '1px solid #ccc'
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
    imageUploaderheight: {
      type: String,
      default: 'auto'
    },
    imageUploaderwidth: {
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
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length)
        return
      // this.createImage(files[0])
      this.$emit('input-image-uploader-event', files[0])
      this.isEmpty = false
      this.isLoading = true
      this.isDisabled = true
      this.withData = false
    },
    removeImage: function (e) {
      this.bgImage = ''
      this.isEmpty = true
      this.isLoading = false
      this.isDisabled = false
      this.withData = false
    }
  },
  watch: {
    // si existe una imagen entonces la pones en el input
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
<style>
.image-uploader_input {
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
}
.image-uploader_input + label {
  border: 1px solid #ccc;
  cursor: pointer;
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 700;
  max-width: 80%;
  overflow: hidden;
  padding: 0.625rem 1.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nc-image-uploader_background {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

