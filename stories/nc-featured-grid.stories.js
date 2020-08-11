import { action } from '@storybook/addon-actions'

import NcFeaturedGrid from '../src/components/nc-featured-grid'

const itemsMock = [
  {
    caption: 'Item 1',
    url: 'http://localhost:6006/item1',
    image: {
      src: 'https://www.franquicia.net/images/nautalia-avion.jpg',
      alt: 'alt item 1'
    }
  },
  {
    caption: 'Item 2',
    url: 'http://localhost:6006/item2',
    image: {
      src: 'https://www.franquicia.net/images/playa8-160.jpg',
      alt: 'alt item 2'
    }
  },
  {
    caption: 'Item 3',
    url: 'http://localhost:6006/item3',
    image: {
      src:
        'https://www.travelbookingturkey.com/files/2015/11/shutterstock_212571667-160x120.jpg',
      alt: 'alt item 3'
    }
  },
  {
    caption: 'Item 4',
    url: 'http://localhost:6006/item4',
    image: {
      src:
        'https://i.pinimg.com/474x/1f/65/8a/1f658ae5d8defbb215e112d701ee6be4--coban-travel-guide.jpg',
      alt: 'alt item 4'
    }
  }
]

export default {
  title: 'NC-featured-grid',
  component: NcFeaturedGrid
}

export const GridWithoutUrl = () => ({
  components: { NcFeaturedGrid },
  data() {
    return {
      title: 'Lorem ipsum',
      subtitle: 'Nulla quis',
      items: itemsMock
    }
  },
  template:
    '<div class="nc-story-container"> <nc-featured-grid :title="title" :subtitle="subtitle" :items="items"></nc-featured-grid> </div>'
})

export const GridWithUrl = () => ({
  components: { NcFeaturedGrid },
  data() {
    return {
      title: 'Lorem ipsum',
      subtitle: 'Nulla quis',
      url: 'http://localhost:6006/test',
      items: itemsMock
    }
  },
  template:
    '<div class="nc-story-container"> <nc-featured-grid :title="title" :url="url" :subtitle="subtitle" :items="items"></nc-featured-grid> </div>'
})
