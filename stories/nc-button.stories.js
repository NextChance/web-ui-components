import { action } from '@storybook/addon-actions';

import NcButton from '../src/components/nc-button';

export default {
    title: 'NC-BUTTON',
    component: NcButton,
};

export const regular = () => ({
    components: { NcButton },
    template: '<div class="nc-button-container"> <nc-button @button-clicked="action">Hello Button</nc-button> </div> ',
    methods: { action: action('clicked') },
});
