import '../src/assets/styles/index.css'
import { addParameters } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Vue2TouchEvents from 'vue2-touch-events'
 
Vue.use(Vue2TouchEvents)
Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 2,
  attempt: 1
})
Vue.use(VueObserveVisibility)

addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
});
