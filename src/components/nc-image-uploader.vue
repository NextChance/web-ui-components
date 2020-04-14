<template>
  <div class="image-uploader__container">
    <figure
        v-if="!!bgImage"
        class="nc-delete_icon"
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
          backgroundImage: bgImage ? `url(${bgImage})` : `url('')`
        }"
    >
      <figure v-if="isEmpty">
        <slot name="isEmptyState">
          <!-- icon for empty input -->
        </slot>
      </figure>
      <figure v-if="isLoading">
        <slot name="isLoadingState">
          <!-- icon for loading -->
        </slot>
      </figure>

      <input
          class="image-uploader_input"
          type="file"
          :id="id"
          :disabled="!!bgImage"
          @change="handleFileChange"
      >
    </label>
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
    hasError: {
      type: Boolean,
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    radius: {
      type: String,
      default: '4px'
    }
  },
  data() {
    return {
      isDisabled: false,
      isEmpty: true,
      isLoading: false,
    }
  },
  methods: {
    _resetStatus() {
      this.isEmpty = true
      this.isLoading = false
      this.isDisabled = false
    },
    handleFileChange(ev) {
      const files = ev.target.files || ev.dataTransfer.files
      if (files.length > 0) {
        this.$emit('input-image-uploader-event', {
          file: files[0],
          imgId: this.id
        })
        this.isEmpty = false
        this.isLoading = true
        this.isDisabled = true
      }
    },
    handleClickRemove: function() {
      this.$emit('input-image-remove-event', { file: '', imgId: this.id })
      this._resetStatus()
    }
  },
  watch: {
    bgImage(newImage) {
      this.isEmpty = true
      this.isLoading = false
      this.isDisabled = true

      if (newImage !== '') {
        this.isEmpty = false
        this.isLoading = false
        this.isDisabled = false
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
  color: $errorColor;
}
</style>
