<template>
  <div>
    <h1>NC_IMAGE_UPLOADER</h1>

    <nc-image-uploader 
      :is-empty="isEmpty"
      @input-image-uploader-event="uploadImage"
      :bg-image="bgImage"
      >
      <template v-slot:isEmptyState>
        <i class="fa fa-plus-circle image-uploader__icon">
        </i> 
      </template>
      <template v-slot:isLoadingState>
        <nc-loader
          :has-text="true"
          :has-veil="true"
          :active="true"
          :text="$t('lang.loading.msg')"
          icon-color="#272727"
          text-color="#272727"
          veil-color="#FFF"
        />
      </template>
      <template v-slot:withDataState>
        <i class="fa fa-times-circle image-uploader__icon">
        </i> 
      </template>
   </nc-image-uploader>
  </div>
</template>
<script>
import ncImageUploader from '@/components/nc-image-uploader.vue'
import ncLoader from '@/components/nc-loader.vue'
import { setTimeout } from 'timers';

export default {
  components: {
    ncImageUploader,
    ncLoader
  },
  data() {
    return {
      isEmpty: true,
      bgImage: ''
    }
  },
  methods: {
    uploadImage() {
      const vm = this
      setTimeout(function() {
        vm.bgImage = 'http://placekitten.com/g/150/90'
      }, 2000)
    }
  }
}
</script>
