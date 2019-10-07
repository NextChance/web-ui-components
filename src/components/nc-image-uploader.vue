<template>
  <div class="image-uploader__container">
    <figure
      v-if="withData"
      class="nc-delete_icon"
      :style="{
        transform: emptyIconScale
      }"
      @click="handleClickRemove"
    >
      <slot name="withDataState">
        <!-- icon for with a background-image -->
      </slot>
    </figure>
      <label
        :class="['nc-image-uploader_background','nc-uploader_label', hasError ? 'error' : '']"
        :style="{
          borderRadius: radius,
          backgroundImage: `url(${bgImage}), url(${bgImage != '' ? defaultBackground : ''})`
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

            <input
              class="image-uploader_input"
              type="file"
              :id="id"
              :disabled="withData"
              @change="handleFileChange"
            >
        </label>
    <div
      class="image-uploader__error"
      v-if="hasError"
      :style="{ 'color': errorColor }"
    >
      {{ $t(errorMsg) }}
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
    defaultBackground: {
      type: String,
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMsg: {
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
      default: 'scale(1.0)'
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
    _resetStatus() {
      this.isEmpty = true
      this.isLoading = false
      this.isDisabled = false
      this.withData = false
    },
    handleFileChange(ev) {
      const files = ev.target.files || ev.dataTransfer.files
        if (files.length > 0) {
          this.$emit('input-image-uploader-event', {file: files[0], imgId: this.id})
          this.isEmpty = false
          this.isLoading = true
          this.isDisabled = true
          this.withData = false
          this.errorMsg = ''
        }
    },
    handleClickRemove: function (ev) {
      this.$emit('input-image-remove-event', {file: '', imgId: this.id})
      this._resetStatus();
    }
  },
  watch: {
    bgImage(newImage) {
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
    },
    hasError(hasErrorNewVal) {
      if (hasErrorNewVal) {
        this._resetStatus()
      }
    }
  }
}
</script>
<style lang="scss">
  $containerBorderColor: #d8d8d8;
  $errorColor: red;

.image-uploader__container {
  position: relative;
  padding: 0 2px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-uploader_input {
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
}
.nc-delete_icon {
  position: absolute;
   z-index: 1;
   margin: 0;
}
.nc-uploader_label {
  position: relative;
  height: 100%;
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
