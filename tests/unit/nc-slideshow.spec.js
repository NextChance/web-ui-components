/* eslint-disable no-debugger */
import { createLocalVue, mount } from '@vue/test-utils'
import ncSlideshow from '@/components/nc-slideshow.vue'
import {
  defaultProps,
  propsWithImages,
  propsWithButtons
} from './fixtures/nc-slideshow.fixture'
import Vue2TouchEvents from 'vue2-touch-events'
const localVue = createLocalVue()
localVue.use(Vue2TouchEvents)

describe('ncSlideshow', () => {
  describe('when mounted without props', () => {
    let wrapper
    let result

    beforeAll(() => {
      wrapper = mount(ncSlideshow, {
        localVue
      })
      result = wrapper.props()
    })

    it('should set all its default props', () => {
      expect(result).toStrictEqual(defaultProps)
    })

    it('should have the prop slideLength with the same value as the number of li', () => {
      expect(wrapper.vm.slideLength).toBe(0)
    })
  })

  describe('with a list of images', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(ncSlideshow, {
        attachToDocument: true,
        localVue,
        propsData: propsWithImages
      })
    })

    it('should have the prop slideLength with the same value as the number of li', () => {
      expect(wrapper.vm.slideLength).toBe(3)
    })
  })

  describe('.rightLinkHandler', () => {
    describe('when right link is clicked and the last slide is displayed', () => {
      let wrapper
      const slideIndex = 2
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          localVue,
          propsData: propsWithButtons
        })
        wrapper.setData({ slideIndex: slideIndex })
        wrapper.vm.rightLinkHandler()
      })
      it('should keep the same slideIndex', () => {
        expect(wrapper.vm.slideIndex).toBe(slideIndex)
      })
      it('slideshow-last-slide is emitted', () => {
        expect(wrapper.emitted('slideshow-last-slide')).toBeTruthy()
      })
    })

    describe('when right link is clicked first time', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          localVue,
          propsData: propsWithButtons,
          attachToDocument: true
        })
        wrapper.vm.rightLinkHandler()
      })
      it('should increase slideIndex', () => {
        expect(wrapper.vm.slideIndex).toBe(1)
      })
      it('the event slideshow-click-right-link is emitted', () => {
        expect(wrapper.emitted('slideshow-click-right-link')).toBeTruthy()
      })
    })
  })

  describe('.selectSlide()', () => {
    const index = 1

    describe('when called with a valid number', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          localVue
        })
      })
      it('should update its slideIndex data', () => {
        wrapper.vm.selectSlide(index)
        expect(wrapper.vm.slideIndex).toBe(index)
      })
    })
  })

  describe('.leftLinkHandler', () => {
    describe('when left link is clicked first time', () => {
      let wrapper
      const slideIndex = 2
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          localVue,
          propsData: propsWithButtons
        })
        wrapper.setData({ slideIndex: slideIndex })
        wrapper.vm.leftLinkHandler()
      })
      it('should increase slideIndex', () => {
        expect(wrapper.vm.slideIndex).toBe(1)
      })
      it('the event slideshow-click-left-link is emitted', () => {
        expect(wrapper.emitted('slideshow-click-left-link')).toBeTruthy()
      })
    })
    describe('when left link is clicked and the last slide is displayed', () => {
      let wrapper
      const slideIndex = 0
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          localVue,
          propsData: propsWithButtons
        })
        wrapper.setData({ slideIndex: slideIndex })
        wrapper.vm.leftLinkHandler()
      })
      it('should keep the same slideIndex', () => {
        expect(wrapper.vm.slideIndex).toBe(slideIndex)
      })
      it('slideshow-last-slide is emitted', () => {
        expect(wrapper.emitted('slideshow-first-slide')).toBeTruthy()
      })
    })
  })

  describe('.resizeSlide', () => {
    describe('When resizeSlide is called', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          attachToDocument: true,
          localVue,
          propsData: defaultProps
        })
        wrapper.setData({ width: '100vw' })
      })
      it('the width of the elements from slideList is changed', () => {
        wrapper.setData({ width: '50vw' })
        wrapper.vm.resizeSlide()
      })
    })
  })
})
