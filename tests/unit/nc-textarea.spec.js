/* eslint-disable no-debugger */
import { mount } from '@vue/test-utils'
import ncTextarea from '@/components/nc-textarea.vue'
import {
  testText
} from './fixtures/nc-textarea.fixture'

describe('ncTextarea', () => {
  describe('methods', () => {
    describe('handleFocus()', () => {
      let wrapper
      let stub = jest.fn()
      beforeAll(() => {
        wrapper = mount(ncTextarea, {
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
        wrapper = mount(ncTextarea, {
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
        wrapper = mount(ncTextarea, {
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
        wrapper = mount(ncTextarea, {
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
        wrapper = mount(ncTextarea, {
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
      let ev = {}
      beforeAll(() => {
        wrapper = mount(ncTextarea, {
          attachToDocument: true,
          slots: {
            iconLeft: '<div><i class="fas fa-question-circle"></i></div>'
          }
        })
        wrapper.setProps({ hasIconLeft: true })
        wrapper.vm.handleIconLeft(ev)
      })

      it('the event input-key-up-event is emitted', () => {
        expect(wrapper.emitted('input-left-icon-event')).toBeTruthy()
      })
    })

    describe('on click right icon', () => {
      let wrapper
      let ev = {}
      beforeAll(() => {
        wrapper = mount(ncTextarea, {
          attachToDocument: true,
          slots: {
            iconRight: '<div><i class="fas fa-question-circle"></i></div>'
          }
        })
        wrapper.setProps({ hasIconRight: true })
        wrapper.vm.handleIconRight(ev)
      })

      it('the event input-right-icon-event is emitted', () => {
        expect(wrapper.emitted('input-right-icon-event')).toBeTruthy()
      })
    })

    describe('on input a value', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncTextarea, {
          attachToDocument: true
        })
        wrapper.find('.input-content__input').setValue(testText)
      })

      it('the event input is emitted', () => {
        expect(wrapper.emitted('input')).toBeTruthy()
      })

      it('the inputValue prop changes', () => {
        expect(wrapper.vm.inputValue).toBe(testText)
      })
    })
  })
})
