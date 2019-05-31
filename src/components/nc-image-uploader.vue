<template>
  <div class="image-uploader__container">
    <div class="box">
					<input 
            id="imageUploader" 
            type="file" 
            name="imageUploader[]" 
            class="image-uploader_input image-uploader_input-4 " 
            data-multiple-caption="{count} files selected" 
            multiple=""
            @change="onFileChange"
            :disabled="isDisabled"
            >
					<label 
            for="imageUploader"
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
                  <!-- icon for empty input -->
                </slot>  
              </figure>
              <figure 
                v-if="withData"
                @click="removeImage">
                <slot 
                  name="withDataState" 
                  >
                  <!-- icon for empty input -->
                </slot>  
              </figure>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg> -->
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
  background-size: cover;
}
</style>

