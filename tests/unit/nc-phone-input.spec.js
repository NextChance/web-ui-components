/* eslint-disable no-debugger */
import { createLocalVue, mount } from '@vue/test-utils'
import ncPhoneInput from '@/components/nc-phone-input.vue'
const localVue = createLocalVue()

describe('ncPhoneInput', () => {
  const defaultProps = {
    value: undefined,
    placeholder: '',
    disabled: false,
    formattingDisabled: false,
    invalidMsg: 'Wrong phone number',
    countryCodeEnabled: true,
    sendInvalidPhone: false,
    required: false,
    name: 'telephone',
    wrapperClasses: '',
    isDisabled: false,
    selectedCountry: {
      dialCode: '+34',
      iso: 'ES'
    },
    inputClasses: '',
    inputOptions: {},
    maxLength: 15,
    uiReference: undefined
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
      wrapper.find('.input-content__input').setValue('123456789')
      expect(wrapper.emitted().input[0]).toEqual(['123456789'])
    })

    it('should emit the onInput event with the response', () => {
      wrapper.find('.input-content__input').setValue('123456789')
      expect(wrapper.emitted().onInput[0]).toEqual([
        {
          country: {
            dialCode: '+34',
            iso: 'ES'
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
      wrapper.find('.input-content__input').trigger('blur')

      expect(stub).toHaveBeenCalled()
    })
  })
})
