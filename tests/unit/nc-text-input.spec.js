/* eslint-disable no-debugger */
import { mount } from '@vue/test-utils'
import ncTextInput from '@/components/nc-text-input.vue'
import {
  defaultProps,
  testText,
  propsWithValue
} from './fixtures/nc-text-input'

describe('ncTextInput', () => {
  describe('when mounted with default props', () => {
    let wrapper
    let result

    beforeAll(() => {
      wrapper = mount(ncTextInput)
      result = wrapper.props()
    })

    it('should set all its default props', () => {
      expect(result).toStrictEqual(defaultProps)
    })

    it('should set hasValue prop to true', () => {
      expect(wrapper.vm.hasValue).toBe(false)
    })
  })

  describe('when mounted with a value', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(ncTextInput, {
        propsData: propsWithValue
      })
    })

    it('should set hasValue prop to true', () => {
      expect(wrapper.vm.hasValue).toBe(true)
    })
  })

  describe('methods', () => {
    describe('handleFocus()', () => {
      let wrapper
      let stub = jest.fn()
      beforeAll(() => {
        wrapper = mount(ncTextInput, {
          attachToDocument: true
        })
        wrapper.setMethods({ handleFocus: stub })
        wrapper.vm.$refs[wrapper.vm.uiReference].focus()
      })

      it('should be called ', () => {
        expect(stub).toBeCalled()
      })
    })

    describe('handleBlur()', () => {
      let wrapper
      let stub = jest.fn()
      beforeAll(() => {
        wrapper = mount(ncTextInput, {
          attachToDocument: true
        })
        wrapper.setMethods({ handleBlur: stub })
        wrapper.vm.$refs[wrapper.vm.uiReference].focus()
        wrapper.vm.$refs[wrapper.vm.uiReference].blur()
      })

      it('should be called ', () => {
        expect(stub).toBeCalled()
      })
    })

    describe('handleInput()', () => {
      let wrapper
      let stub = jest.fn()
      beforeAll(() => {
        wrapper = mount(ncTextInput, {
          attachToDocument: true
        })
        wrapper.setMethods({ handleInput: stub })
        wrapper.find('.input-content__input').setValue(testText)
      })

      it('should be called ', () => {
        expect(stub).toBeCalled()
      })
    })
  })

  describe('events', () => {
    describe('on focus', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncTextInput, {
          attachToDocument: true
        })
        wrapper.vm.$refs[wrapper.vm.uiReference].focus()
      })

      it('the event input-focus-event is emitted', () => {
        expect(wrapper.emitted('input-focus-event')).toBeTruthy()
      })

      it('should hasValue props to be true', () => {
        expect(wrapper.vm.isFocused).toBe(true)
      })
    })

    describe('on blur', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncTextInput, {
          attachToDocument: true
        })
        wrapper.vm.$refs[wrapper.vm.uiReference].focus()
        wrapper.vm.$refs[wrapper.vm.uiReference].blur()
      })

      it('the event input-blur-event is emitted', () => {
        expect(wrapper.emitted('input-blur-event')).toBeTruthy()
      })

      it('should hasValue props to be false', () => {
        expect(wrapper.vm.isFocused).toBe(false)
      })
    })

    describe('on click left icon', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncTextInput, {
          attachToDocument: true,
          slots: {
            iconLeft: '<div><i class="fas fa-question-circle"></i></div>'
          }
        })
        wrapper.setProps({ hasIconLeft: true })
        wrapper.vm.handleIconLeft({})
      })

      it('the event input-left-icon-event is emitted', () => {
        expect(wrapper.emitted('input-left-icon-event')).toBeTruthy()
      })
    })

    describe('on click right icon', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncTextInput, {
          attachToDocument: true,
          slots: {
            iconRight: '<div><i class="fas fa-question-circle"></i></div>'
          }
        })
        wrapper.setProps({ hasIconRight: true })
        wrapper.vm.handleIconRight({})
      })

      it('the event input-right-icon-event is emitted', () => {
        expect(wrapper.emitted('input-right-icon-event')).toBeTruthy()
      })
    })

    describe('on input a value', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncTextInput, {
          attachToDocument: true
        })

        wrapper.find('.input-content__input').setValue(testText)
      })

      it('the event input is emitted', () => {
        expect(wrapper.emitted('input')).toBeTruthy()
      })

      it('the value emitted is the same as that the value set', () => {
        expect(wrapper.emitted().input[0][0]).toEqual(testText)
      })
    })
  })
})
