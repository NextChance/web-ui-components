import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './lang'
import Vue2TouchEvents from 'vue2-touch-events'
import { VueHammer } from 'vue2-hammer'

Vue.config.productionTip = false
Vue.use(Vue2TouchEvents)
Vue.use(VueHammer)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
