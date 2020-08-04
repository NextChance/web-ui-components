import { action } from '@storybook/addon-actions'
import i18n from '../src/lang'

import ncTextInput from '../src/components/nc-text-input'

export default {
    title: 'NC-text-input',
    component: ncTextInput,
};

export const regular = () => ({
    components: { ncTextInput },
    template: '<div class="nc-story-container"> <nc-text-input/> </div> '
});

export const withLeftIcon = () => ({
    components: { ncTextInput },
    template: '<div class="nc-story-container"> <nc-text-input :has-icon-left="true"> <template v-slot:iconLeft> <i class="fas fa-search-location"></i> </template> </nc-text-input> </div>'
});

export const withRightIcon = () => ({
    components: { ncTextInput },
    template: '<div class="nc-story-container"> <nc-text-input :has-icon-right="true"> <template v-slot:iconRight> <i class="fas fa-question-circle"></i> </template> </nc-text-input> </div>'
});

export const withClearOption = () => ({
    components: { ncTextInput },
    data() {
        return {
            newValueToDelete: 'lorem ipsum',
            error: null
        }
    },
    template: '<div class="nc-story-container"> ' +
        '<nc-text-input :has-icon-left="true" :has-icon-right="true" :has-icon-right-on-focus="true" :icon-right-has-pointer="true" @input-right-icon-event="action" v-model="newValueToDelete">' +
            '<template v-slot:iconLeft> <i class="fas fa-search-location"></i> </template> ' +
            '<template v-slot:iconRight> <i class="fas fa-times-circle"></i> </template> ' +
        '</nc-text-input> </div>',
    methods: {action: action('clear')}

});


export const withValidation = () => ({
    components: { ncTextInput },
    data(){
        return {
            errorInputValidation: {
                text: 'lorem ipsum error',
                variables: {}
            }
        }
    },
    template: '<div class="nc-story-container"> <nc-text-input value="lorem ipsum" :error="errorInputValidation" label="label" @input="action"></nc-text-input> </div>',
    methods: {action: action('input')},
    i18n
});
