<template>
  <div
    :class="['nc-phone-input', wrapperClasses, { disabled: disabled }]"
    :selected-country="selectedCountry">
    <nc-text-input
      ref="phoneCountryCode"
      input-type="number"
      has-icon-left
      :class="['nc-phone-input__phone', inputClasses]"
      :ui-reference="uiReference"
      :label="placeholder"
      :value="value"
      :size="maxLength"
      :disabled="isDisabled"
      @input="onInput"
      @input-blur-event="onBlur"
      @input-focus-event="handleFocusEvent"
    >
      <template v-slot:iconLeft>
        <div
          class="nc-phone-input__country-code"
          @click="showCountryCodesList">
          <!-- emoji -->
          <span class="nc-phone-input__flag">{{ countryEmojiFlag }}</span>
          <!-- country code -->
          <span v-if="countryCodeEnabled" class="nc-phone-input__code-number">{{ selectedCountry.dialCode }}</span>
        </div>
      </template>
    </nc-text-input>
  </div>
</template>

<script>
/**
 * Code based on https://github.com/EducationLink/vue-tel-input
 * Credit to https://github.com/iamstevendao
 */
import { formatNumber, AsYouType, isValidNumber } from 'libphonenumber-js'
import flag from 'country-code-emoji'
import ncTextInput from './nc-text-input.vue'

export default {
  name: 'nc-phone-input',
  components: {
    ncTextInput
  },
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    formattingDisabled: {
      type: Boolean,
      default: false
    },
    invalidMsg: {
      default: 'Wrong phone number',
      type: String
    },
    countryCodeEnabled: {
      type: Boolean,
      default: true
    },
    sendInvalidPhone: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'telephone'
    },
    wrapperClasses: {
      type: String,
      default: ''
    },
    selectedCountry: {
      type: Object,
      default() {
        return {
          dialCode: '+34',
          iso: 'ES'
        }
      }
    },
    inputClasses: {
      type: String,
      default: ''
    },
    inputOptions: {
      type: Object,
      default: () => ({})
    },
    maxLength: {
      type: Number,
      default: 15
    },
    uiReference: {
      type: String
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$emit('onValidate', this.response)
    this.countryEmojiFlag = flag(this.selectedCountry.iso)
  },
  created() {
    if (this.value) {
      this.phone = this.value
    }
  },
  data() {
    return {
      phone: '',
      format: [
        /* See https://github.com/catamphetamine/libphonenumber-js#formatformat-string-options */
        'National', // (213) 373-4253
        'International' // +1 213 373 4253
      ],
      countryEmojiFlag: '',
      isCountryCodeListOpen: false
    }
  },
  computed: {
    displayMode() {
      const firstChar = (this.phone && this.phone[0]) || ''
      let mode

      switch (firstChar) {
        case '0':
          mode = 'prefix'
          break
        case '+':
          mode = 'code'
          break
        default:
          mode = 'normal'
          break
      }

      return mode
    },
    formattedResult() {
      // Calculate phone number based on mode
      if (!this.displayMode) {
        return ''
      }
      let phone = this.phone
      if (this.displayMode === 'code') {
        // If user manually type the country code
        const formatter = new AsYouType()
        formatter.input(this.phone)
      } else if (this.displayMode === 'prefix') {
        // Remove the first '0' if this is a '0' prefix number
        // Ex: 0432421999
        phone = this.phone.slice(1)
      }
      if (this.formattingDisabled) {
        return this.phone
      }
      return formatNumber(
        phone,
        this.selectedCountry && this.selectedCountry.iso.toUpperCase(),
        this.format[0]
      )
    },
    isValid() {
      return isValidNumber(
        this.formattedResult,
        this.selectedCountry && this.selectedCountry.iso.toUpperCase()
      )
    },
    response() {
      // If it is a valid number, returns the formatted value
      // otherwise returns what it is

      const response = {
        number: this.isValid ? this.formattedResult : this.phone,
        isValid: this.isValid,
        country: this.selectedCountry
      }

      // If formatting to the input is disabled, try to return the formatted value to its parent

      if (this.formattingDisabled) {
        Object.assign({}, response, {
          formattedNumber: formatNumber(
            this.phone,
            this.selectedCountry && this.selectedCountry.iso.toUpperCase(),
            this.format[0]
          )
        })
      }

      return response
    }
  },
  watch: {
    isValid(value) {
      if (value && this.displayMode !== 'prefix') {
        // If mode is 'prefix', keep the number as user typed,
        // Otherwise format it
        this.phone = this.formattedResult
      }
      this.$emit('onValidate', this.response)
    },
    value() {
      this.phone = this.value
    },
    selectedCountry() {
      if (this.selectedCountry.iso) {
        this.countryEmojiFlag = flag(this.selectedCountry.iso)
      }
    }
  },
  methods: {
    showCountryCodesList() {
      this.$emit('showCountryCodesList')
      this.isCountryCodeListOpen = true
    },
    onInput(value) {
      this.phone = value
      // TODO: Replace with our custom validation
      // this.$refs.input.setCustomValidity(this.response.isValid ? '' : this.invalidMsg);
      // Emit input event in case v-model is used in the parent
      this.$emit('input', this.response.number)
      this.$emit('onInput', this.response)
      if (this.sendInvalidPhone && !(this.response.isValid)) {
        this.$emit('onValidate', this.response)
      }
    },
    onBlur() {
      this.$emit('onBlur')
    },

    handleFocusEvent() {
      if (this.isCountryCodeListOpen) {
        this.$refs.phoneCountryCode.$el.querySelector('input').blur()
        this.isCountryCodeListOpen = false
      }
    }
  }
}
</script>

<style lang="scss">
.nc-text-input__container {
  border: 1px solid #d8d8d8;
}
.nc-phone-input {
  width: 300px;
  height: 60px;

  &__country-code {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__flag {
    margin-right: 6px;
  }

  &__code-number {
    margin-right: 6px;
    font-size: 15px;
  }

  &__phone {
    border: none;
    border-radius: 0 2px 2px 0;
    width: 100%;
    outline: none;
    font-size: 15px;
    line-height: 1.4;
  }
}
</style>
