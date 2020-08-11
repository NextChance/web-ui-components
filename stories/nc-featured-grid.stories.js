import { action } from '@storybook/addon-actions'

import NcFeaturedGrid from '../src/components/nc-featured-grid'

const itemsMock = [
  {
    caption: 'Item 1',
    url: 'http://localhost:6006/item1',
    image: {
      src:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTsvBktz7XlUXCPjnqKw0LiOQBU7sHFLrQTfosq1kVEjNAh6Q&s',
      alt: 'alt item 1'
    }
  },
  {
    caption: 'Item 2',
    url: 'http://localhost:6006/item2',
    image: {
      src:
        'https://i.pinimg.com/originals/29/7f/53/297f534ba2a2adb3633c65dd00157c16.jpg',
      alt: 'alt item 2'
    }
  },
  {
    caption: 'Item 3',
    url: 'http://localhost:6006/item3',
    image: {
      src:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAa59NQ4kCxd1WSIttTdUreZ1YlZpp72zBJb1lLwyTOGpcIRk&s',
      alt: 'alt item 3'
    }
  },
  {
    caption: 'Item 4',
    url: 'http://localhost:6006/item4',
    image: {
      src: 'https://roatanvideo.com/wp-content/themes/roatan/images/rr.jpg',
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
