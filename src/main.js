import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './lang'
import Vue2TouchEvents from 'vue2-touch-events'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(Vue2TouchEvents)
Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 2,
  attempt: 1
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
