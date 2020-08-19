import { action } from '@storybook/addon-actions'

import NcSlideshow from '../src/components/nc-slideshow-v2'

const imagesMock = [
  {
    url: 'https://google.com',
    image: 'https://www.etsan.at/wp-content/uploads/2016/01/about-cover-1.jpg',
    alt: 'test'
  },
  {
    url: 'https://marca.es',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLG8Rr0SqCN8hSAj_5BBxycxxgP9tWi5SYiGoc-pYbH-29U1o&s',
    alt: 'test 2'
  },
  {
    url: 'https://marca.es',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJKIuBZMyH7oxEyduYDwZIJLca5pY4OZ6qNc2ZnKpTt0LJtZc&s',
    alt: 'test 3'
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
    '<div class="nc-slides-container" style="height: 250px;max-width: 906px"> <nc-slideshow :images="images" :autoplay-time="4000" @on-analytics="action"></nc-slideshow> </div>',
  methods: { action: action('clicked') }
})
