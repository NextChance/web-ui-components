import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NcTextInput from './views/NcTextInput.vue'
import NcImageUploader from './views/NcImageUploader.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/componentInputTypeText',
      name: 'componentInputTypeText',
      component: NcTextInput
    },
    {
      path: '/componentImageUploader',
      name: 'componentImageUploader',
      component: NcImageUploader
    }
  ]
})
