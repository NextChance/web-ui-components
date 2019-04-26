<template>
  <div
    :class="['nc-phone-input', wrapperClasses, { disabled: disabled }]"
    :selected-country="selectedCountry">
    <div
      class="nc-phone-input__country-code"
      @click="showCountryCodesList">
      <!-- emoji -->
      <img
        v-if="enabledFlags"
        class="nc-phone-input__flag"
        :src="'data:image/png;base64, ' + selectedCountry.flag" />
      <!-- country code -->
      <span v-if="enabledCountryCode" class="nc-phone-input__code-number">{{ selectedCountry.dialCode }}</span>
    </div>
    <!-- TODO: Replace for nc-input -->
    <input
      ref="input"
      :class="['nc-phone-input__phone', inputClasses]"
      v-model="phone"
      type= "tel"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :name="name"
      :maxlength="maxLength"
      @blur="onBlur"
      @input="onInput" />
  </div>
</template>

<script>
/**
 * Code based on https://github.com/EducationLink/vue-tel-input
 * Credit to https://github.com/iamstevendao
 */
import { formatNumber, AsYouType, isValidNumber } from 'libphonenumber-js'

export default {
  name: 'nc-phone-input',
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: 'Enter a phone number'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledFormatting: {
      type: Boolean,
      default: false,
    },
    invalidMsg: {
      default: 'Wrong phone number',
      type: String,
    },
    enabledCountryCode: {
      type: Boolean,
      default: true
    },
    enabledFlags: {
      type: Boolean,
      default: true
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
          iso2: 'ES',
          name: 'España',
          flag: 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNUU3QzUwNTE3ODcxMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNUU3QzUwNjE3ODcxMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY1RTdDNTAzMTc4NzExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY1RTdDNTA0MTc4NzExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hN0M3QAAAeBJREFUeNrElk2L00AYx3+TTCw1adndLlS2KLv4Ug+CeBCk4s1v4cWLn8WLNz+B38GbXrysKOxBVFwRXRXStbiktcFmW5IZn5qCwgYRUpqBITPPPOT/vP5n1K5/LgS2ZMasZjRk9vViwV/flYA7VDR0+rMabH1qLasEWM0eO+N/5Ve7FqXztU0hzdQycGPt7ZjiIzs3S+YGRFENK/vW5hQvkoVZnJUJNcMC6Tz66zCdOTx/EDA4qpElE9rNjN49Qz0Q5CPRccsAF40AwvfimGeoZSkfXkoAOgHtbo1RGBEJbmdb9I6XDSyF/v30NpOPdYb9dzSCLa7dvs+ZXsynw0fo7CsdPSgV6pO9NM/dDPzxBeyry7wRz/eabQ5HG0y/XWXy+Qr+8LzkoVyedSGwmBMLIGdnXBcj9t9anr1+yCX3AJ8uyXHjT/HZZQHPfyQ5NBcNU0+RSLPdaod44QGD8Q/8uzs4616uZ8t43CyQ1mG01hfPXHo34UW3ixvVudF6wm7rC9YRezdFLylBINlTdZJAxBPl5iFXvpIeFg8dIRI3xY7lMFUYI3tVgkD27nSKq07lLJFZB+2kv2WpcXFVHmNjy3G8Tgb6P9TcpXO19nxTySVR3X28ePI0Vvz0iX8JMADE1p16B3U5CwAAAABJRU5ErkJggg=='
        }
      }
    },
    inputClasses: {
      type: String,
      default: ''
    },
    inputOptions: {
      type: Object,
      default: () => ({}),
    },
    maxLength: {
      type: Number,
      default: 15,
    }
  },
  mounted() {
    this.$emit('onValidate', this.response);
  },
  created() {
    if (this.value) {
      this.phone = this.value
    }
  },
  data() {
    return {
      phone: '',
    }
  },
  computed: {
    mode() {
      if (!this.phone) {
        return ''
      }
      if (this.phone[0] === '+') {
        return 'code'
      }
      if (this.phone[0] === '0') {
        return 'prefix'
      }
      return 'normal'
    },
    formattedResult() {
      // Calculate phone number based on mode
      if (!this.mode) {
        return '';
      }
      let phone = this.phone;
      if (this.mode === 'code') {
        // If user manually type the country code
        const formatter = new AsYouType();// eslint-disable-line
        formatter.input(this.phone);
      } else if (this.mode === 'prefix') {
        // Remove the first '0' if this is a '0' prefix number
        // Ex: 0432421999
        phone = this.phone.slice(1);
      }
      if (this.disabledFormatting) {
        return this.phone;
      }
      return formatNumber(phone, this.selectedCountry && this.selectedCountry.iso2, 'National');
    },
    state() {
      return isValidNumber(this.formattedResult, this.selectedCountry && this.selectedCountry.iso2);
    },
    response() {
      // If it is a valid number, returns the formatted value
      // Otherwise returns what it is
      const response = {
        number: this.state ? this.formattedResult : this.phone,
        isValid: this.state,
        country: this.selectedCountry,
      }
      // If formatting to the input is disabled, try to return the formatted value to its parent
      if (this.disabledFormatting) {
        Object.assign(response, {
          formattedNumber: formatNumber(this.phone, this.selectedCountry && this.selectedCountry.iso2, 'National')
        })
      }
      return response;
    }
  },
  watch: {
    state(value) {
      if (value && this.mode !== 'prefix') {
        // If mode is 'prefix', keep the number as user typed,
        // Otherwise format it
        this.phone = this.formattedResult;
      }
      // eslint-disable-next-line no-console
      // console.log('this.response', this.response)
      this.$emit('onValidate', this.response);
    },
    value() {
      this.phone = this.value;
    },
  },
  methods: {
    showCountryCodesList() {
      // eslint-disable-next-line no-console
      // console.log('Open Country codes list')
      this.$emit('showCountryCodesList');
    },
    onInput() {
      // TODO: Replace with our custom validation
      // this.$refs.input.setCustomValidity(this.response.isValid ? '' : this.invalidMsg);
      // Emit input event in case v-model is used in the parent
      // eslint-disable-next-line no-console
      // console.log('this.response.number', this.response.number)
      this.$emit('input', this.response.number);
      // Emit the response, includes phone, validity and country
      // eslint-disable-next-line no-console
      // console.log('this.response', this.response)
      this.$emit('onInput', this.response);
    },
    onBlur() {
      this.$emit('onBlur');
    }
  }
}
</script>

<style lang="scss">
.nc-phone-input {
  width: 300px;
  height: 60px;
  border-radius: 4px;
  display: flex;
  border: 1px solid #d8d8d8;
  background-color: #ffffff;
  text-align: left;
  padding: 16px;
  box-sizing: border-box;

  &__country-code {
    display: flex;
    align-items: center;
    padding-left: 7px;
  }

  &__flag {
    width: 18px;
    height: 14px;
    margin-right: 10px;
  }

  &__code-number {
    color: #272727;
    margin-right: 20px;
    font-size: 15px;
  }

  &__phone {
    border: none;
    border-radius: 0 2px 2px 0;
    width: 100%;
    outline: none;
    font-size: 15px;
    color: #272727;
    line-height: 1.4;
  }
}
</style>
