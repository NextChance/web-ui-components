/* eslint-disable no-debugger */
import { createLocalVue, mount } from '@vue/test-utils'
import ncPhoneInput from '@/components/nc-phone-input.vue'
const localVue = createLocalVue()

describe('ncPhoneInput', () => {
  describe('when a value with a + as first character is given', () => {
    let wrapper
    const defaultProps = {
      value: '+666666666'
    }

    beforeEach(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps,
        mocks: {
          $t: a => a
        }
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

    beforeEach(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps,
        mocks: {
          $t: a => a
        }
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

    beforeEach(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps,
        mocks: {
          $t: a => a
        }
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

    beforeEach(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps,
        mocks: {
          $t: a => a
        }
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

    beforeEach(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps,
        mocks: {
          $t: a => a
        }
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

    beforeEach(() => {
      wrapper = mount(ncPhoneInput, {
        attachToDocument: true,
        localVue,
        propsData: defaultProps,
        mocks: {
          $t: a => a
        }
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

    beforeEach(() => {
      wrapper = mount(ncPhoneInput, {
        localVue,
        propsData: defaultProps,
        mocks: {
          $t: a => a
        }
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
