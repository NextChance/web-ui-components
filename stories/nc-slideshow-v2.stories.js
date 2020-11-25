import { action } from '@storybook/addon-actions'

import NcSlideshow from '../src/components/nc-slideshow-v2'

const imagesMock = [
  {
    url: 'https://google.com',
    image: 'https://s3.eu-west-1.amazonaws.com/cms-prod.billionhands.com/images/desktop_Billionhands_bluelow_moda_complementos_069ce5bcb3.png',
    alt: 'test'
  },
  {
    url: 'https://marca.es',
    image:
      'https://s3.eu-west-1.amazonaws.com/cms-prod.billionhands.com/images/Desktop_vichi_belleza_beauty_tendencias_c47c665bd0.jpg',
    alt: 'test 2'
  },
  {
    url: 'https://marca.es',
    image:
      'https://s3.eu-west-1.amazonaws.com/cms-prod.billionhands.com/images/Desktop_Hawkers_billionhands_moda_complementos_gafas_ca89b92216.jpg',
    alt: 'test 3'
  },
  {
    url: 'https://marca.es',
    image:
      'https://s3.eu-west-1.amazonaws.com/cms-prod.billionhands.com/images/Desktop_sarenza_moda_complementos_billionhands_d5fd700670.jpg',
    alt: 'test 3'
  },
  {
    url: 'https://marca.es',
    image: 'https://s3.eu-west-1.amazonaws.com/cms-prod.billionhands.com/images/MIX_DESCARGA_LA_APP_1504x250_Desktop_XL_f10cb4f63a.jpg',
    alt: 'test 3'
  }
]

const oneImages = [
  {
    url: 'https://google.com',
    image: 'https://www.etsan.at/wp-content/uploads/2016/01/about-cover-1.jpg',
    alt: 'test'
  }
]

export default {
  title: 'NC-slideshow',
  component: NcSlideshow
}

export const regular = () => ({
  components: { NcSlideshow },
  data() {
    return {
      images: imagesMock,
      placeholderImage: require('../src/assets/svg/default-vertical.svg'),
      errorImage: require('../src/assets/svg/error-loading-picture.svg')
    }
  },
  template:
    '<div class="nc-slides-container" style="height: 250px;max-width: 906px"> <nc-slideshow :images="images" :autoplay-time="4000" @on-analytics="action" :placeholder-image="placeholderImage" :error-image="errorImage"></nc-slideshow> </div>',
  methods: { action: action('clicked') }
})

export const oneImg = () => ({
  components: { NcSlideshow },
  data() {
    return {
      images: oneImages,
      placeholderImage: require('../src/assets/svg/default-vertical.svg'),
      errorImage: require('../src/assets/svg/error-loading-picture.svg')
    }
  },
  template:
    '<div class="nc-slides-container" style="height: 250px;max-width: 906px"> <nc-slideshow :images="images" :autoplay-time="4000" @on-analytics="action" :placeholder-image="placeholderImage" :error-image="errorImage"></nc-slideshow> </div>',
  methods: { action: action('clicked') }
})

export const activeNavigationDots = () => ({
  components: { NcSlideshow },
  data() {
    return {
      images: imagesMock,
      placeholderImage: require('../src/assets/svg/default-vertical.svg'),
      errorImage: require('../src/assets/svg/error-loading-picture.svg')
    }
  },
  template:
    '<div class="nc-slides-container" style="height: 250px;max-width: 906px"> <nc-slideshow :images="images" :autoplay-time="4000" has-dot-navigation @on-analytics="action" :placeholder-image="placeholderImage" :error-image="errorImage"></nc-slideshow> </div>',
  methods: { action: action('clicked') }
})
