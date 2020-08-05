import { action } from '@storybook/addon-actions'

import NcSlideshow from '../src/components/nc-slideshow-v2'

const imagesMock = [
  {
    url: 'https://google.com',
    src: 'https://www.w3schools.com/howto/img_nature_wide.jpg',
    alt: 'test'
  },
  {
    url: 'https://marca.es',
    src: 'https://www.w3schools.com/howto/img_snow_wide.jpg',
    alt: 'test 2'
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
      images: imagesMock
    }
  },
  template:
    '<div class="nc-slides-container"> <nc-slideshow :images="images" :autoplay-time="4000"></nc-slideshow> </div>',
  methods: { action: action('clicked') }
})
