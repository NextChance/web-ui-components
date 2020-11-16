import { action } from '@storybook/addon-actions'

import NcProductDetail from '../src/components/nc-product-detail'

export default {
  title: 'NC-product-detail',
  component: NcProductDetail
}

export const regular = () => ({
  components: { NcProductDetail },
  data() {
    return {
      title: 'product ui',
      subtitle: 'lelelelelelelele',
      url: '',
      product: {
        id: 'f05e0b78-7f92-479d-9a28-5bb81c0be087',
        name: 'Viajes seguros',
        fullPrice: '800 €',
        salePrice: '536 €',
        url: null,
        image:
          'https://www.hola.com/imagenes/viajes/20171024101019/jardin-monstruos-bomarzo-italia/0-499-829/Parco-dei-Mostri-Bomarzo-a.jpg',
        highlighted: true
      },
      isExternalUrl: true
    }
  },
  template:
    '<div class="nc-story-container"> <nc-product-detail  @on-navigate="actionNavigate" @on-analytics="actionAnalytics" @on-image-click="openProductDetail"  :title="title" :subtitle="subtitle" :url="url" :product="product"></nc-product-detail>  </div> ',
  methods: {
    actionAnalytics: action('clicked on-analytics'),
    actionNavigate: action('clicked on-navigate'),
    openProductDetail: action('clicked on-image-click')
  }
})

export const withLink = () => ({
  components: { NcProductDetail },
  data() {
    return {
      title: 'product ui',
      subtitle: 'lelelelelelelele',
      url: 'https://billionhands.com/',
      product: {
        id: 'f05e0b78-7f92-479d-9a28-5bb81c0be087',
        name: 'Viajes seguros',
        fullPrice: '800 €',
        salePrice: '536 €',
        url: '',
        image:
          'https://s3.eu-west-1.amazonaws.com/chatme-media/development/users/5c9193ff-2d87-488f-9868-c5a38af905ac/products/f05e0b78-7f92-479d-9a28-5bb81c0be087/2bb44b28-8e1f-4c37-a243-87fb3b40c796.jpg',
        highlighted: false
      },
      isExternalUrl: true
    }
  },
  template:
    '<div class="nc-story-container"> <nc-product-detail @on-analytics="action"  @on-image-click="openProductDetail"  :title="title" :subtitle="subtitle" :url="url" :product="product"></nc-product-detail>  </div> ',
  methods: {
    action: action('clicked on-analytics'),
    openProductDetail: action('clicked on-image-click')
  }
})
