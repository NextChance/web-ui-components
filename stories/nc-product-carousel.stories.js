import { action } from '@storybook/addon-actions'

import NcProductCarousel from '../src/components/nc-product-carousel'

const itemsMock = [
  {
    title: '',
    url: 'https://www.google.com',
    image: {
      src:
        'https://blog.laminasyaceros.com/hs-fs/hubfs/Rolando%20Sarabia/Peces/laminas%20y%20aceros%20peces.jpg?width=473&name=laminas%20y%20aceros%20peces.jpg',
      alt: 'image1'
    }
  },
  {
    title: '',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://cdn.pixabay.com/photo/2020/01/09/14/35/fish-4752920_960_720.jpg',
      alt: 'image2'
    }
  },
  {
    title: '',
    url: 'https://www.google.com',
    image: {
      src:
        'https://blog.laminasyaceros.com/hs-fs/hubfs/Rolando%20Sarabia/Peces/laminas%20y%20aceros%20pez%20mandarin.jpg?width=495&name=laminas%20y%20aceros%20pez%20mandarin.jpg',
      alt: 'image1'
    }
  },
  {
    title: '',
    url: 'https://www.google.com',
    image: {
      src:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pez_Escalar_Red_Devil.jpg/576px-Pez_Escalar_Red_Devil.jpg',
      alt: 'image1'
    }
  },
  {
    title: '',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://blog.laminasyaceros.com/hs-fs/hubfs/Rolando%20Sarabia/Peces/laminas%20y%20aceros%20pez%20angel%20de%20cara%20azul.jpg?width=542&name=laminas%20y%20aceros%20pez%20angel%20de%20cara%20azul.jpg',
      alt: 'image2'
    }
  },
  {
    title: '',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://blog.laminasyaceros.com/hs-fs/hubfs/Rolando%20Sarabia/Peces/laminas%20y%20aceros%20pez%20loro.jpg?width=546&name=laminas%20y%20aceros%20pez%20loro.jpg',
      alt: 'image2'
    }
  },
  {
    title: '',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://i2.bssl.es/faunatura/2018/07/pez-estandarte-faunatura-1024x682.jpg',
      alt: 'image2'
    }
  },
  {
    title: '',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://www.aquariumcostadealmeria.com/wp-content/uploads/2018/03/destacada-2.jpg',
      alt: 'image2'
    }
  },
  {
    title: '',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://sertv.gob.pa/crisolfm/wp-content/uploads/sites/2/2019/09/peces-de-agua-dulce.jpg',
      alt: 'image2'
    }
  },
  {
    title: '',
    url: 'https://www.marca.com',
    image: {
      src: 'https://img2.rtve.es/i/?w=1600&i=1562502992232.jpg',
      alt: 'image2'
    }
  },
  {
    title: '',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/592c05a35bafe806a33c9872/pez-guppy_0.jpg',
      alt: 'image2'
    }
  },
  {
    title: '',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://peces.paradais-sphynx.com/wp-content/uploads/2019/05/peces.jpg',
      alt: 'image2'
    }
  }
]

export default {
  title: 'NC-product-carousel',
  component: NcProductCarousel
}

export const ProductCarousel = () => ({
  components: { NcProductCarousel },
  data() {
    return {
      title: 'Prueba',
      url: '',
      secondaryText: 'soy texto',
      items: itemsMock
    }
  },
  template:
    '<div class="nc-story-container-2"> <nc-product-carousel @on-analytics="action" :title="title" :url="url" :secondary-text="secondaryText" :items="items"><template><p>Bla bla bla</p><p>Precio</p></template></nc-product-carousel></div>',
  methods: { action: action('clicked') }
})
