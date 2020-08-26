import { action } from '@storybook/addon-actions'

import NcCarousel from '../src/components/nc-carousel'

const itemsMock = [
  {
    title: 'Descripción cómo máximo de 2 líneas Descripción cómo máximo bla',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.google.com',
    image: {
      src:
        'https://images-eu.ssl-images-amazon.com/images/I/51o9u5TmOgL._AC_SY400_.jpg',
      alt: 'image1'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://cdn.pixabay.com/photo/2020/01/09/14/35/fish-4752920_960_720.jpg',
      alt: 'image2'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.google.com',
    image: {
      src:
        'https://blog.laminasyaceros.com/hs-fs/hubfs/Rolando%20Sarabia/Peces/laminas%20y%20aceros%20pez%20mandarin.jpg?width=495&name=laminas%20y%20aceros%20pez%20mandarin.jpg',
      alt: 'image1'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.google.com',
    image: {
      src:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pez_Escalar_Red_Devil.jpg/576px-Pez_Escalar_Red_Devil.jpg',
      alt: 'image1'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://blog.laminasyaceros.com/hs-fs/hubfs/Rolando%20Sarabia/Peces/laminas%20y%20aceros%20pez%20angel%20de%20cara%20azul.jpg?width=542&name=laminas%20y%20aceros%20pez%20angel%20de%20cara%20azul.jpg',
      alt: 'image2'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://blog.laminasyaceros.com/hs-fs/hubfs/Rolando%20Sarabia/Peces/laminas%20y%20aceros%20pez%20loro.jpg?width=546&name=laminas%20y%20aceros%20pez%20loro.jpg',
      alt: 'image2'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://i2.bssl.es/faunatura/2018/07/pez-estandarte-faunatura-1024x682.jpg',
      alt: 'image2'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://www.aquariumcostadealmeria.com/wp-content/uploads/2018/03/destacada-2.jpg',
      alt: 'image2'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://sertv.gob.pa/crisolfm/wp-content/uploads/sites/2/2019/09/peces-de-agua-dulce.jpg',
      alt: 'image2'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.marca.com',
    image: {
      src: 'https://img2.rtve.es/i/?w=1600&i=1562502992232.jpg',
      alt: 'image2'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/592c05a35bafe806a33c9872/pez-guppy_0.jpg',
      alt: 'image2'
    }
  },
  {
    title: 'Titulo producto',
    firstText: '190,8€',
    secondText: '490,8€',
    url: 'https://www.marca.com',
    image: {
      src:
        'https://peces.paradais-sphynx.com/wp-content/uploads/2019/05/peces.jpg',
      alt: 'image2'
    }
  }
]

export default {
  title: 'NC-carousel',
  component: NcCarousel
}

export const carousel = () => ({
  components: { NcCarousel },
  data() {
    return {
      title: 'Título de 65 carácteres',
      items: itemsMock
    }
  },
  template:
    '<div class="nc-story-container-2"> <nc-carousel @on-analytics="action" :title="title" :url="url" :secondary-text="secondaryText" :items="items"><template><p>Bla bla bla</p><p>Precio</p></template></nc-carousel></div>',
  methods: { action: action('clicked') }
})

export const carouselWithUrl = () => ({
  components: { NcCarousel },
  data() {
    return {
      title: 'Título de 65 carácteres máximo Título de 65 carácteres máximo Título de',
      url: 'Enlace',
      secondaryText: '',
      items: itemsMock
    }
  },
  template:
    '<div class="nc-story-container-2"> <nc-carousel @on-analytics="action" :title="title" :url="url" :secondary-text="secondaryText" :items="items"><template><p>Bla bla bla</p><p>Precio</p></template></nc-carousel></div>',
  methods: { action: action('clicked') }
})

export const carouselWithSecondaryText = () => ({
  components: { NcCarousel },
  data() {
    return {
      title: 'Título de 65 ',
      url: '',
      secondaryText: 'Text',
      items: itemsMock
    }
  },
  template:
    '<div class="nc-story-container-2"> <nc-carousel @on-analytics="action" :title="title" :url="url" :secondary-text="secondaryText" :items="items"><template><p>Bla bla bla</p><p>Precio</p></template></nc-carousel></div>',
  methods: { action: action('clicked') }
})
