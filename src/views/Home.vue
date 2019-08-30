<template>
  <div class="home">
    <h1>COMPONENTS</h1>
    <h2>DUMB COMPONENT</h2>
    <Dumb/>
    <hr>
    <br>
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
      :opened="opened"
      :showCloseIcon="showCloseIcon"
      :showHeader="showHeader"
      :showFooter="showFooter"
      :padding="padding"
      :marginTop="marginTop"
      :noVerticallyAligned="noVerticallyAligned"
      :width="width"
      :height="height"
      :overlayStyle="modalOverlayStyle"
      @close="opened = false"
    >
      <template v-slot:header>
        <h1>Comparte los beneficios de Billionhands</h1>
      </template>
      <template v-slot:content>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>12NYS5</p>
      </template>
      <template v-slot:footer>
        <button>Copiar código</button>
      </template>
    </nc-modal>
    <button @click="opened = true">Show Modal</button>
    <hr>
    <br>
    <h2>NC-SLIDER COMPONENT</h2>
    <div id="slider" class="slider">
      <nc-slider min="20" minLabel="Min 20 Km" minValue="20" @slider-stop-drag="sliderStopDrag"></nc-slider>

      <nc-slider max="150" maxLabel="Max 150 Km" maxValue="150" @slider-stop-drag="sliderStopDrag"></nc-slider>

      <nc-slider
        min="0"
        minLabel="Desde 0 €"
        minValue="0"
        max="1000"
        maxLabel="Hasta 1000 €"
        maxValue="1000"
        @slider-stop-drag="sliderStopDrag"
      ></nc-slider>

      <nc-slider
        min="0"
        minLabel="Desde 0 %"
        minValue="0"
        max="100"
        maxLabel="Hasta 100 %"
        maxValue="100"
        @slider-stop-drag="sliderStopDrag"
      ></nc-slider>
    </div>
    <hr>
    <br>
    <h2>NC-SLIDESHOW COMPONENT</h2>
    <div class="slideshow">
      <nc-slideshow
        :has-link-right="true"
        :has-link-left="true"
        :links-default-action="true"
        @slideshow-click-left-link="clickSlideshowLinkLeft"
        @slideshow-click-right-link="clickSlideshowLinkRight"
        @slideshow-last-slide="lastSlide"
        @slideshow-first-slide="firstSlide"
      >
        <template>
          <li class="item">SLIDE 1</li>
          <li class="item">SLIDE 2</li>
          <li class="item">SLIDE 3</li>
        </template>
      </nc-slideshow>
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
    <h1>NC_CARD_ITEM</h1>
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
    <h1>NC_COUPON_ITEM</h1>
    <div class="nc-coupon-item-container">
      <nc-coupon-item
        :caption-style="ncCouponCaptionStyle"
        :image="ncCardItemImage"
        :name="ncCouponUser"
        :description="ncCardItemDescription"
        :total-price="ncCouponTotalPrice"
        :discounted-price="ncCouponDiscountedPrice"
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
  </div>
</template>


<script>
// @ is an alias to /src
import Dumb from '@/components/Dumb.vue'
import ncLoader from '@/components/nc-loader.vue'
import ncList from '@/components/nc-list.vue'
import ncModal from '@/components/nc-modal.vue'
import ncSlider from '@/components/nc-slider.vue'
import ncSlideshow from '@/components/nc-slideshow.vue'
import ncButton from '@/components/nc-button.vue'
import ncSeparator from '@/components/nc-separator.vue'
import ncPhoneInput from '@/components/nc-phone-input.vue'
import ncTextInput from '@/components/nc-text-input.vue'
import ncCardItem from '@/components/nc-card-item.vue'
import ncCouponItem from '@/components/nc-coupon-item.vue'
import ncImageUploader from '@/components/nc-image-uploader.vue'
import ncTextarea from '@/components/nc-textarea.vue'

export default {
  name: 'home',
  components: {
    Dumb,
    ncLoader,
    ncList,
    ncModal,
    ncSlider,
    ncSlideshow,
    ncButton,
    ncSeparator,
    ncTextInput,
    ncPhoneInput,
    ncCardItem,
    ncCouponItem,
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
      showCloseIcon: true,
      showHeader: false,
      showFooter: true,
      opened: false,
      padding: '34px',
      marginTop: '0',
      width: '588px',
      height: '630px',
      noVerticallyAligned: false,
      modalOverlayStyle: {
        background: '#FFF'
      },
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
      ncCouponUser: 'Default User Name',
      ncCouponCaptionStyle: {
        position: 'absolute',
        bottom: '10px',
        right: '10px'
      },
      ncCouponTotalPrice: '43€',
      ncCouponDiscountedPrice: '21.50€',
      ncDescritionLineEllipsis: 2,
      ncTitleLineEllipsis: 1,
      ncTextAreaValue: 'Valor por defecto',
      selectedItem:  {
        dialCode: '+34',
        iso: 'ES'
      },
      ncPhoneInputLabel: 'Teléfono de contacto'
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
    sliderStopDrag(values) {
      // eslint-disable-next-line no-console
      console.log('slider-stop-drag', values)
    },
    onItemSelected(ev) {
      // eslint-disable-next-line no-console
      console.log('item-selected', ev)
    }
  }
}
</script>

<style scoped>
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
.nc-coupon-item-container {
  width: 328px;
  height: 144px;
  margin: auto;
  font-size: 17px;
  border-radius: 8px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
}
</style>
