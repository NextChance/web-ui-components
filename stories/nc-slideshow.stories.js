import { action } from '@storybook/addon-actions';

import NcSlideshow from '../src/components/nc-slideshow-v2';

const images = [
    {
        url: 'https://google.com',
        src: 'https://www.w3schools.com/howto/img_nature_wide.jpg',
        alt: 'test'
    },
    {
        url: 'https://marca.es',
        src: 'https://www.w3schools.com/howto/img_snow_wide.jpg',
        alt: 'test 2'
    }
]

export default {
    title: 'NC-slideshow',
    component: NcSlideshow,
};

export const regular = () => ({
    components: { NcSlideshow },
    data(){
        return {
            data: {
                images
            }
        }
    },
    template: '<div class="nc-slides-container"> <nc-slideshow :data="data"></nc-slideshow> </div> <script>',
    methods: { action: action('clicked') },
})
