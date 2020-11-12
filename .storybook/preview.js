import '../src/assets/styles/index.css'
import { addParameters } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 2,
  attempt: 1
})

addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
});
