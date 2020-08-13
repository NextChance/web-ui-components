<template>
  <div class="home">
    <div class="nc-slides-container" style="height: 300px;max-width: 870px"> <nc-slideshow-v2 :images="images" :autoplay-time="time"></nc-slideshow-v2> </div>
  </div>
</template>


<script>
import NcSlideshowV2 from '@/components/nc-slideshow-v2'

const imagesMock = [
  {
    url: 'https://google.com',
    image: 'https://www.w3schools.com/howto/img_nature_wide.jpg',
    alt: 'test'
  },
  {
    url: 'https://marca.es',
    image: 'https://www.w3schools.com/howto/img_snow_wide.jpg',
    alt: 'test 2'
  }
]

export default {
  name: 'home',
  components: {
    NcSlideshowV2
  },
  data() {
    return {
      time: 3000,
      images: imagesMock,
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
