import { action } from '@storybook/addon-actions'

import NcFeaturedDetail from '../src/components/nc-featured-detail'

export default {
  title: 'NC-featured-detail',
  component: NcFeaturedDetail
}

export const regularWithCaption = () => ({
  components: { NcFeaturedDetail },
  data() {
    return {
      title: 'Lorem Ipsum',
      data: {
        url: 'https://www.lipsum.com/',
        caption: 'Lorem Ipsum',
        image: {
          src:
            'https://leadsfac.com/wp-content/uploads/2019/10/Lorem-Ipsum-alternatives.png',
          alt: 'alt de la imagen'
        }
      }
    }
  },
  template:
    '<div class="nc-story-container"> <nc-featured-detail :title="title" :element="data" @button-clicked="action">Hello Button</nc-featured-detail> </div> ',
  methods: { action: action('clicked') }
})

export const titleTwoLines = () => ({
  components: { NcFeaturedDetail },
  data() {
    return {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempus sapien eget rhoncus viverra. Pellentesque pharetra aliquet arcu, et fringilla urna tempor et.',
      data: {
        url: 'https://www.lipsum.com/',
        caption: '',
        image: {
          src:
            'https://leadsfac.com/wp-content/uploads/2019/10/Lorem-Ipsum-alternatives.png',
          alt: 'alt de la imagen'
        }
      }
    }
  },
  template:
    '<div class="nc-story-container"> <nc-featured-detail :title="title" :element="data" @button-clicked="action">Hello Button</nc-featured-detail> </div> ',
  methods: { action: action('clicked') }
})
