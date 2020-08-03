import { action } from '@storybook/addon-actions';

import NcText from '../src/components/nc-text-input';

export default {
    title: 'NC-text-input',
    component: NcText,
};

export const regular = () => ({
    components: { NcText },
    template: '<div class="nc-phone-input-container"> <nc-text-input/> </div> ',
    methods: { action: action('clicked') },
});
