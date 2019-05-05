/* eslint-disable no-debugger */
import { createLocalVue, mount } from '@vue/test-utils'
import ncPhoneInput from '@/components/nc-phone-input.vue'
const localVue = createLocalVue()

describe('ncPhoneInput', () => {
  const defaultProps = {
    value: undefined,
    placeholder: 'Enter a phone number',
    disabled: false,
    formattingDisabled: false,
    invalidMsg: 'Wrong phone number',
    countryCodeEnabled: true,
    flagsEnabled: true,
    required: false,
    name: 'telephone',
    wrapperClasses: '',
    selectedCountry: {
      dialCode: '+34',
      iso2: 'ES',
      name: 'España',
      flag:
        'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNUU3QzUwNTE3ODcxMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNUU3QzUwNjE3ODcxMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY1RTdDNTAzMTc4NzExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY1RTdDNTA0MTc4NzExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hN0M3QAAAeBJREFUeNrElk2L00AYx3+TTCw1adndLlS2KLv4Ug+CeBCk4s1v4cWLn8WLNz+B38GbXrysKOxBVFwRXRXStbiktcFmW5IZn5qCwgYRUpqBITPPPOT/vP5n1K5/LgS2ZMasZjRk9vViwV/flYA7VDR0+rMabH1qLasEWM0eO+N/5Ve7FqXztU0hzdQycGPt7ZjiIzs3S+YGRFENK/vW5hQvkoVZnJUJNcMC6Tz66zCdOTx/EDA4qpElE9rNjN49Qz0Q5CPRccsAF40AwvfimGeoZSkfXkoAOgHtbo1RGBEJbmdb9I6XDSyF/v30NpOPdYb9dzSCLa7dvs+ZXsynw0fo7CsdPSgV6pO9NM/dDPzxBeyry7wRz/eabQ5HG0y/XWXy+Qr+8LzkoVyedSGwmBMLIGdnXBcj9t9anr1+yCX3AJ8uyXHjT/HZZQHPfyQ5NBcNU0+RSLPdaod44QGD8Q/8uzs4616uZ8t43CyQ1mG01hfPXHo34UW3ixvVudF6wm7rC9YRezdFLylBINlTdZJAxBPl5iFXvpIeFg8dIRI3xY7lMFUYI3tVgkD27nSKq07lLJFZB+2kv2WpcXFVHmNjy3G8Tgb6P9TcpXO19nxTySVR3X28ePI0Vvz0iX8JMADE1p16B3U5CwAAAABJRU5ErkJggg=='
    },
    inputClasses: '',
    inputOptions: {},
    maxLength: 15
  }

  describe('when mounted without props', () => {
    let wrapper
    let result

    beforeAll(() => {
      wrapper = mount(ncPhoneInput, {
        localVue
      })
      result = wrapper.props()
    })

    it('should set all its default props', () => {
      expect(result).toStrictEqual(defaultProps)
    })
  })

  describe('when a value with a + as first character is given', () => {
    let wrapper
    const defaultProps = {
      value: '+666666666'
    }

    beforeAll(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps
      })
    })

    it('should set computed property displayMode to code', () => {
      expect(wrapper.vm.displayMode).toBe('code')
    })
  })

  describe('when a value with a 0 as first character is given', () => {
    let wrapper
    const defaultProps = {
      value: '0666666666'
    }

    beforeAll(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps
      })
    })

    it('should set computed property display mode to prefix', () => {
      expect(wrapper.vm.displayMode).toBe('prefix')
    })
  })

  describe('when a value with a non-zero number as first character is given', () => {
    let wrapper
    const defaultProps = {
      value: '666666666'
    }

    beforeAll(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps
      })
    })

    it('should set computed property display mode to normal', () => {
      expect(wrapper.vm.displayMode).toBe('normal')
    })
  })

  describe('when disabledFormatting is set to true', () => {
    let wrapper
    const defaultProps = {
      value: '00666666666',
      formattingDisabled: true
    }

    beforeAll(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps
      })
    })

    it('should phone equals value entered', () => {
      expect(wrapper.vm.phone).toBe('00666666666')
    })
  })

  describe('when country code element is clicked', () => {
    let wrapper
    const defaultProps = {
      value: '00666666666',
      formattingDisabled: true
    }

    beforeAll(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps
      })
    })

    it('should emit the showCountryCodesList event', () => {
      wrapper.find('.nc-phone-input__country-code').trigger('click')
      expect(wrapper.emitted('showCountryCodesList')).toBeTruthy()
    })
  })

  describe('when user enters a character in the phone input element', () => {
    let wrapper
    const defaultProps = {
      value: '00666666666',
      formattingDisabled: true
    }

    beforeAll(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps
      })
    })

    it('should emit the input event with the number in the response', () => {
      wrapper.find('.nc-phone-input__phone').setValue('123456789')
      expect(wrapper.emitted().input[0]).toEqual(['123456789'])
    })

    it('should emit the onInput event with the response', () => {
      wrapper.find('.nc-phone-input__phone').setValue('123456789')
      expect(wrapper.emitted().onInput[0]).toEqual([
        {
          country: {
            dialCode: '+34',
            flag:
              'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNUU3QzUwNTE3ODcxMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNUU3QzUwNjE3ODcxMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY1RTdDNTAzMTc4NzExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY1RTdDNTA0MTc4NzExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hN0M3QAAAeBJREFUeNrElk2L00AYx3+TTCw1adndLlS2KLv4Ug+CeBCk4s1v4cWLn8WLNz+B38GbXrysKOxBVFwRXRXStbiktcFmW5IZn5qCwgYRUpqBITPPPOT/vP5n1K5/LgS2ZMasZjRk9vViwV/flYA7VDR0+rMabH1qLasEWM0eO+N/5Ve7FqXztU0hzdQycGPt7ZjiIzs3S+YGRFENK/vW5hQvkoVZnJUJNcMC6Tz66zCdOTx/EDA4qpElE9rNjN49Qz0Q5CPRccsAF40AwvfimGeoZSkfXkoAOgHtbo1RGBEJbmdb9I6XDSyF/v30NpOPdYb9dzSCLa7dvs+ZXsynw0fo7CsdPSgV6pO9NM/dDPzxBeyry7wRz/eabQ5HG0y/XWXy+Qr+8LzkoVyedSGwmBMLIGdnXBcj9t9anr1+yCX3AJ8uyXHjT/HZZQHPfyQ5NBcNU0+RSLPdaod44QGD8Q/8uzs4616uZ8t43CyQ1mG01hfPXHo34UW3ixvVudF6wm7rC9YRezdFLylBINlTdZJAxBPl5iFXvpIeFg8dIRI3xY7lMFUYI3tVgkD27nSKq07lLJFZB+2kv2WpcXFVHmNjy3G8Tgb6P9TcpXO19nxTySVR3X28ePI0Vvz0iX8JMADE1p16B3U5CwAAAABJRU5ErkJggg==',
            iso2: 'ES',
            name: 'España'
          },
          isValid: false,
          number: '123456789'
        }
      ])
    })
  })

  describe('when user focus on phone input and leaves', () => {
    let wrapper
    const defaultProps = {
      value: '00666666666',
      formattingDisabled: true
    }

    beforeAll(() => {
      wrapper = mount(ncPhoneInput, {
        localVue,
        propsData: defaultProps
      })
    })

    it('should call onBlur method', () => {
      let stub = jest.fn()
      wrapper.setMethods({ onBlur: stub })
      wrapper.find('.nc-phone-input__phone').trigger('blur')

      expect(stub).toHaveBeenCalled()
    })
  })
})