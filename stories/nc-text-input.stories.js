import { action } from '@storybook/addon-actions'
import ncTextInput from '../src/components/nc-text-input'

export default {
    title: 'NC-text-input',
    component: ncTextInput,
};

export const regular = () => ({
    components: { ncTextInput },
    template: '<div class="nc-story-container"> <nc-text-input/> </div> ',
    methods: { action: action('clicked') },
});
