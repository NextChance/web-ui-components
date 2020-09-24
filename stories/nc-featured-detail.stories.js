import { action } from '@storybook/addon-actions'

import NcFeaturedDetail from '../src/components/nc-featured-detail'

export default {
  title: 'NC-featured-detail',
  component: NcFeaturedDetail
}

export const regular = () => ({
  components: { NcFeaturedDetail },
  data() {
    return {
      title: 'Lorem Ipsum',
      itemUrl: 'https://www.lipsum.com/',
      image: {
        src:
          'https://leadsfac.com/wp-content/uploads/2019/10/Lorem-Ipsum-alternatives.png',
        alt: 'alt de la imagen'
      }
    }
  },
  template:
    '<div class="nc-story-container"> <nc-featured-detail  @on-analytics="action" :title="title" :item-url="itemUrl" :image="image">Hello Button</nc-featured-detail> </div> ',
  methods: { action: action('clicked') }
})

export const titleTwoLines = () => ({
  components: { NcFeaturedDetail },
  data() {
    return {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempus sapien eget rhoncus viverra. Pellentesque pharetra aliquet arcu, et fringilla urna tempor et.',
      itemUrl: 'https://www.lipsum.com/',
      image: {
        src:
          'https://leadsfac.com/wp-content/uploads/2019/10/Lorem-Ipsum-alternatives.png',
        alt: 'alt de la imagen'
      }
    }
  },
  template:
    '<div class="nc-story-container"> <nc-featured-detail  @on-analytics="action"  :title="title" :item-url="itemUrl" :image="image">Hello Button</nc-featured-detail> </div> ',
  methods: { action: action('clicked') }
})

export const withSubtitle = () => ({
  components: { NcFeaturedDetail },
  data() {
    return {
      title: 'Lorem Ipsum',
      subtitle: 'lorem ipsum',
      itemUrl: 'https://www.lipsum.com/',
      image: {
        src:
          'https://leadsfac.com/wp-content/uploads/2019/10/Lorem-Ipsum-alternatives.png',
        alt: 'alt de la imagen'
      }
    }
  },
  template:
    '<div class="nc-story-container"> <nc-featured-detail  @on-analytics="action" :title="title" :subtitle="subtitle" :item-url="itemUrl" :image="image">Hello Button</nc-featured-detail> </div> ',
  methods: { action: action('clicked') }
})

export const withSubtitleLink = () => ({
  components: { NcFeaturedDetail },
  data() {
    return {
      title: 'Lorem Ipsum',
      subtitle: 'lorem ipsum',
      url: 'http://localhost:8081/',
      itemUrl: 'https://www.lipsum.com/',
      image: {
        src:
          'https://leadsfac.com/wp-content/uploads/2019/10/Lorem-Ipsum-alternatives.png',
        alt: 'alt de la imagen'
      }
    }
  },
  template:
    '<div class="nc-story-container"> <nc-featured-detail  @on-analytics="action" :title="title" :subtitle="subtitle" :url="url" :item-url="itemUrl" :image="image">Hello Button</nc-featured-detail> </div> ',
  methods: { action: action('clicked') }
})
