<template>
  <div class="home">
    <h2>NC-LOADER COMPONENT</h2>
    <div class="test">
      <nc-loader
          icon-color="#272727"
          text-color="#272727"
          veil-color="#FFF"
          :has-text="true"
          :has-veil="true"
          :active="true"
          :text="$t('lang.loading.msg')"
      />
    </div>
    <hr>
    <br>
    <h2>NC-LIST COMPONENT</h2>
    <div class="nc-list-container">
      <nc-list
          search-label="Buscar"
          search-icon="../assets/svg/category.png"
          :has-search="true"
          :show-checked-icon="true"
          :items="items"
          @item-selected="onItemSelected"
      >
        <template slot-scope="{item}">
          <span class="item-on-left">{{ item.name }}</span>
          <span class="item-on-right">{{ item.dialCode }}</span>
        </template>
      </nc-list>
    </div>
    <hr>
    <br>
    <h1>NC_MODAL</h1>
    <nc-modal
        v-if="currentModal === 'modal1'"
        has-header
        has-footer
        @close="currentModal = null"
    >
      <template v-slot:header>
        <h1>Comparte los beneficios de Billionhands</h1>
      </template>
      <template v-slot:content>
        <h1>este modal puede no puede cerrarse al pulsar en el sombreado!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>12NYS5</p>
      </template>
      <template v-slot:footer>
        <button>Copiar código</button>
      </template>
    </nc-modal>

    <nc-modal
        v-if="currentModal === 'modal2'"
        has-header
        has-footer
        closeOnOverlayClick
        @close="currentModal = null"
    >
      <template v-slot:header>
        <h1>texto del header</h1>
      </template>
      <template v-slot:content>
        <h1>este modal puede cerrarse si pulsas en el sombreado!</h1>
      </template>
      <template v-slot:footer>
        <button>boton!</button>
      </template>
    </nc-modal>

    <button @click="currentModal = 'modal1'">Show  example modal 1</button>
    <button @click="currentModal = 'modal2'">Show  example modal 2</button>

    <hr>
    <br>
    <h2>NC-SLIDER COMPONENT</h2>
    <div id="slider" class="slider">
      <nc-slider
          minValue="1"
          :max="maxDistanceLimit"
          :maxLabel="maxDistance"
          :maxValue="maxDistance"
          @slider-stop-drag="sliderStopDistance">
      </nc-slider>

      <nc-slider
          :min="minPriceLimit"
          :minLabel="minPrice"
          :minValue="minPrice"
          :max="maxPriceLimit"
          :maxLabel="maxPrice"
          :maxValue="maxPrice"
          @slider-stop-drag="sliderStopPrice">
      </nc-slider>

      <nc-slider
          :min="minPercentageLimit"
          :minLabel="minPercentage"
          :minValue="minPercentage"
          :max="maxPercentageLimit"
          :maxLabel="maxPercentage"
          :maxValue="maxPercentage"
          @slider-stop-drag="sliderStopDiscount">
      </nc-slider>
    </div>
    <hr>
    <br>
    <h2>NC-SLIDESHOW COMPONENT</h2>
    <div class="slideshow">
      <nc-slideshow
          :has-link-right="true"
          :has-link-left="true"
          :links-default-action="true"
          :images="['http://via.placeholder.com/640x360', 'http://via.placeholder.com/640x560', 'http://via.placeholder.com/800x360']"
          @slideshow-click-left-link="clickSlideshowLinkLeft"
          @slideshow-click-right-link="clickSlideshowLinkRight"
          @slideshow-last-slide="lastSlide"
          @slideshow-first-slide="firstSlide"
      />
    </div>
    <hr>
    <br>
    <h1>NC_BUTTON</h1>
    <div class="nc-button-container">
      <nc-button @button-clicked="handleClicked">
        <template>Basic Button</template>
      </nc-button>
      <nc-button @button-clicked="handleClicked">
        <template>
          <i class="fas fa-plus-circle"></i>
          Icon Button
        </template>
      </nc-button>
      <nc-button :disabled="true" @click="handleClicked">
        <template>Disabled Button</template>
      </nc-button>
    </div>
    <hr>
    <br>

    <h2>NC-SEPARATOR</h2>
    <p>With icon:</p>
    <nc-separator>
      <template>
        <i class="fab fa-accusoft"></i>
      </template>
    </nc-separator>
    <p>With text:</p>
    <nc-separator>
      <template>
        <span>o</span>
      </template>
    </nc-separator>

    <hr>
    <br>
    <hr>
    <br>

    <h1>NC_PHONE_INPUT</h1>
    <div class="nc-phone-input-container">
      <nc-phone-input
          :placeholder="ncPhoneInputLabel"
      />
    </div>
    <br>
    <br>
    <h1>NC_TEXT_INPUT</h1>
    <div class="home-nc-text-input-container">
      <nc-text-input/>
      <router-link to="/componentInputTypeText">See other examples</router-link>
    </div>
    <br>
    <br>
    <h1>NC_CARD-ITEM</h1>
    <div class="nc-card-item-container">
      <nc-card-item
          :caption-style="ncCardCaptionStyle"
          :image="ncCardItemImage"
          :title="ncCardItemTitle"
          :title-line-ellipsis="ncTitleLineEllipsis"
          :description="ncCardItemDescription"
          :description-line-ellipsis="ncDescritionLineEllipsis"
      />
    </div>

    <br>
    <br>
    <h1>NC_IMAGE_UPLOADER</h1>
    <router-link to="/componentImageUploader">See behaviour</router-link>

    <h3>Ready to upload an image</h3>
    <nc-image-uploader :is-empty="true">
      <template v-slot:isEmptyState>
        <i class="fa fa-plus-circle image-uploader__icon"></i>
      </template>
      <template v-slot:isLoadingState>
        <nc-loader
            icon-color="#272727"
            text-color="#272727"
            veil-color="#FFF"
            :has-text="true"
            :has-veil="true"
            :active="true"
            :text="$t('lang.loading.msg')"
        />
      </template>
      <template v-slot:withDataState>
        <i class="fa fa-times-circle image-uploader__icon"></i>
      </template>
    </nc-image-uploader>
    <br>

    <h3>Uploanding an image</h3>
    <nc-image-uploader :is-loading="true">
      <template v-slot:isEmptyState>
        <i class="fa fa-plus-circle image-uploader__icon"></i>
      </template>
      <template v-slot:isLoadingState>
        <nc-loader
            icon-color="#272727"
            text-color="#272727"
            veil-color="#FFF"
            :has-text="false"
            :has-veil="true"
            :active="true"
        />
      </template>
      <template v-slot:withDataState>
        <i class="fa fa-times-circle image-uploader__icon"></i>
      </template>
    </nc-image-uploader>
    <br>

    <h3>Uploaded image</h3>
    <nc-image-uploader :with-data="true" bg-image="http://placekitten.com/g/150/90">
      <template v-slot:isEmptyState>
        <i class="fa fa-plus-circle image-uploader__icon"></i>
      </template>
      <template v-slot:isLoadingState>
        <nc-loader
            icon-color="#272727"
            text-color="#272727"
            veil-color="#FFF"
            :has-text="true"
            :has-veil="true"
            :active="true"
            :text="$t('lang.loading.msg')"
        />
      </template>
      <template v-slot:withDataState>
        <i class="fa fa-times-circle image-uploader__icon"></i>
      </template>
    </nc-image-uploader>
    <br>

    <h1>NC_TEXTAREA</h1>
    <div class="home-nc-text-input-container">
      <nc-textarea :value="ncTextAreaValue"/>
    </div>
    <br>
    <br>

    <h1>NC_SLIDER_V2</h1>
    <div class="home__nc-slider-v2__container">
      <nc-slider-v2
          :isDouble="false"
          :floorLabel="`${sliderV2_values[0]} km`"
          :minValue="0"
          :floorValue="sliderV2_values[0]"
          :ceilLabel="`${sliderV2_values[1]} km`"
          :maxValue="1000"
          :ceilValue="sliderV2_values[1]"
          @change="sliderV2Change"
      />
      <nc-slider-v2
          :isDouble="true"
          :floorLabel="`${sliderV2_values2[0]}%`"
          :minValue="15"
          :floorValue="sliderV2_values2[0]"
          :ceilLabel="`${sliderV2_values2[1]}%`"
          :maxValue="100"
          :ceilValue="sliderV2_values2[1]"
          @change="sliderV2Change2"
      />
      <nc-slider-v2
          isDisabled
          :isDouble="true"
          :floorLabel="`${sliderV2_values2[0]}%`"
          :minValue="15"
          :floorValue="sliderV2_values2[0]"
          :ceilLabel="`${sliderV2_values2[1]}%`"
          :maxValue="100"
          :ceilValue="sliderV2_values2[1]"
          @change="sliderV2Change2"
      />
    </div>
    <br>
    <br>
  </div>
</template>


<script>
import ncLoader from '@/components/nc-loader.vue'
import ncList from '@/components/nc-list.vue'
import ncModal from '@/components/nc-modal.vue'
import ncSlider from '@/components/nc-slider.vue'
import ncSliderV2 from '@/components/nc-slider-v2.vue'
import ncSlideshow from '@/components/nc-slideshow.vue'
import ncButton from '@/components/nc-button.vue'
import ncSeparator from '@/components/nc-separator.vue'
import ncPhoneInput from '@/components/nc-phone-input.vue'
import ncTextInput from '@/components/nc-text-input.vue'
import ncCardItem from '@/components/nc-card-item.vue'
import ncImageUploader from '@/components/nc-image-uploader.vue'
import ncTextarea from '@/components/nc-textarea.vue'

export default {
  name: 'home',
  components: {
    ncLoader,
    ncList,
    ncModal,
    ncSlider,
    ncSliderV2,
    ncSlideshow,
    ncButton,
    ncSeparator,
    ncTextInput,
    ncPhoneInput,
    ncCardItem,
    ncImageUploader,
    ncTextarea
  },
  data() {
    return {
      items: [
        {
          id: '1234567890',
          name: 'Bélgica',
          dialCode: '+34',
          searchText: '+34 Bélgica'
        },
        {
          id: '2345678901',
          name: 'Bruselas',
          dialCode: '+1',
          searchText: '+1 Bruselas'
        }
      ],
      currentModal: null,
      ncCardItemImage:
        'https://cdn-images-1.medium.com/max/800/1*-PlqbnwqjqJi_EVmrhmuDQ.jpeg',
      ncCardItemDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Excepteur sint occaecat cupidatat non proident, sunt',
      ncCardItemTitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      ncCardCaptionStyle: {
        position: 'absolute',
        bottom: '10px',
        right: '10px'
      },
      ncDescritionLineEllipsis: 2,
      ncTitleLineEllipsis: 1,
      ncTextAreaValue: 'Valor por defecto',
      selectedItem: {
        dialCode: '+34',
        iso: 'ES'
      },
      ncPhoneInputLabel: 'Teléfono de contacto',
      maxDistance: '150',
      maxDistanceLimit: '150',
      minPrice: '0',
      maxPrice: '1000',
      minPercentage: '15',
      maxPercentage: '100',
      minPriceLimit: '0',
      maxPriceLimit: '1000',
      minPercentageLimit: '15',
      maxPercentageLimit: '100',
      sliderV2_values: [15, 250],
      sliderV2_values2: [30, 80]
    }
  },
  methods: {
    selectItem(ev) {
      // eslint-disable-next-line no-console
      console.log(ev)
    },
    handleClicked(ev) {
      // eslint-disable-next-line no-console
      console.log(ev)
    },
    clickSlideshowLinkLeft(ev) {
      // eslint-disable-next-line no-console
      console.log('left', ev.currentTarget)
    },
    clickSlideshowLinkRight(ev) {
      // eslint-disable-next-line no-console
      console.log('right', ev.currentTarget)
    },
    lastSlide(ev) {
      // eslint-disable-next-line no-console
      console.log('last-slide', ev.currentTarget)
    },
    firstSlide(ev) {
      // eslint-disable-next-line no-console
      console.log('first-slide', ev.currentTarget)
    },
    sliderStopDistance(values) {
      this.maxDistance = values[1]
    },

    sliderStopPrice(values) {
      this.minPrice = String(values[0])
      this.maxPrice = values[1]
    },

    sliderStopDiscount(values) {
      this.minPercentage = String(values[0])
      this.maxPercentage = values[1]
    },

    sliderV2Change(values) {
      this.sliderV2_values = values
    },

    sliderV2Change2(values) {
      this.sliderV2_values2 = values
    },

    onItemSelected(ev) {
      // eslint-disable-next-line no-console
      console.log('item-selected', ev)
    }
  }
}
</script>

<style scoped lang="scss">
.test {
  width: 100%;
  height: 250px;
}
.slideshow {
  width: 80vw;
  height: 30vh;
  overflow: hidden;
  margin: auto;
}
.nc-phone-input-container {
  display: flex;
  justify-content: center;
}
.nc-button-container button {
  margin: 10px;
}
.home-nc-text-input-container {
  width: 300px;
  margin: auto;
}
.nc-card-item-container {
  width: 220px;
  margin: auto;
  font-size: 17px;
  border-radius: 8px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
}

.home {
  &__nc-slider-v2 {
    &__container {
      margin: 0 auto;
      width: 500px;
      max-width: 75vw;
    }
  }
}
</style>
