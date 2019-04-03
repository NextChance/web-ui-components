/* eslint-disable no-debugger */
import { createLocalVue, mount } from '@vue/test-utils'
import ncSlideshow from '@/components/nc-slideshow.vue'
import Vue2TouchEvents from 'vue2-touch-events'
const localVue = createLocalVue()
localVue.use(Vue2TouchEvents)

describe('ncSlideshow', () => {
  const defaultProps = {
    paginationActiveClass: 'active',
    paginationStyle: undefined,
    hasLinkLeft: false,
    hasLinkRight: false,
    leftLinkText: 'Previous',
    rightLinkText: 'Next',
    linksDefaultAction: false,
    leftLinkStyle: undefined,
    rightLinkStyle: undefined,
    ariaText: { ariaTextDots: 'Slide' }
  }
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

  describe('when mounted slot', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(ncSlideshow, {
        attachToDocument: true,
        localVue,
        slots: {
          default:
            '<li class="item">SLIDE 1</li><li class="item">SLIDE 2</li><li class="item">SLIDE 3</li>'
        }
      })
    })

    it('should have the prop slideLength with the same value as the number of li', () => {
      expect(wrapper.vm.slideLength).toBe(3)
    })
  })

  describe('.selectSlide()', () => {
    const index = 1
    describe('when a dot is clicked', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          attachToDocument: true,
          localVue,
          propsData: defaultProps
        })
      })
      it('should be called', () => {
        let stub = jest.fn()
        wrapper.setMethods({ selectSlide: stub })
        wrapper.find('.dots li:nth-of-type(1) button').trigger('click')
        expect(stub).toBeCalled()
      })
    })

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

  describe('.rightLinkHandler', () => {
    const defaultProps = {
      paginationActiveClass: 'active',
      paginationStyle: undefined,
      hasLinkLeft: false,
      hasLinkRight: true,
      leftLinkText: 'Previous',
      rightLinkText: 'Next',
      linksDefaultAction: true,
      leftLinkStyle: undefined,
      rightLinkStyle: undefined,
      ariaText: { ariaTextDots: 'Slide' }
    }
    describe('when right link is clicked', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          localVue,
          propsData: defaultProps
        })
      })
      it('should be called', () => {
        let stub = jest.fn()
        wrapper.setMethods({ rightLinkHandler: stub })
        wrapper.find('.nc-slideshow__link--right').trigger('click')
        expect(stub).toBeCalled()
      })
    })
    describe('when right link is clicked first time', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          localVue,
          propsData: defaultProps
        })
        wrapper.find('.nc-slideshow__link--right').trigger('click')
      })
      it('should increase slideIndex', () => {
        expect(wrapper.vm.slideIndex).toBe(1)
      })
      it('the event slideshow-click-right-link is emitted', () => {
        expect(wrapper.emitted('slideshow-click-right-link')).toBeTruthy()
      })
    })
    describe('when right link is clicked and the last slide is displayed', () => {
      let wrapper
      const slideIndex = 2
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          localVue,
          propsData: defaultProps
        })
        wrapper.setData({ slideIndex: slideIndex })
        wrapper.find('.nc-slideshow__link--right').trigger('click')
      })
      it('should keep the same slideIndex', () => {
        expect(wrapper.vm.slideIndex).toBe(slideIndex)
      })
      it('slideshow-last-slide is emitted', () => {
        expect(wrapper.emitted('slideshow-last-slide')).toBeTruthy()
      })
    })
  })

  describe('.leftLinkHandler', () => {
    const defaultProps = {
      paginationActiveClass: 'active',
      paginationStyle: undefined,
      hasLinkLeft: true,
      hasLinkRight: false,
      leftLinkText: 'Previous',
      rightLinkText: 'Next',
      linksDefaultAction: true,
      leftLinkStyle: undefined,
      rightLinkStyle: undefined,
      ariaText: { ariaTextDots: 'Slide' }
    }
    describe('when left link is clicked', () => {
      let wrapper
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          localVue,
          propsData: defaultProps
        })
      })
      it('should be called', () => {
        let stub = jest.fn()
        wrapper.setMethods({ leftLinkHandler: stub })
        wrapper.find('.nc-slideshow__link--left').trigger('click')
        expect(stub).toBeCalled()
      })
    })
    describe('when left link is clicked first time', () => {
      let wrapper
      const slideIndex = 2
      beforeAll(() => {
        wrapper = mount(ncSlideshow, {
          localVue,
          propsData: defaultProps
        })
        wrapper.setData({ slideIndex: slideIndex })
        wrapper.find('.nc-slideshow__link--left').trigger('click')
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
          propsData: defaultProps
        })
        wrapper.setData({ slideIndex: slideIndex })
        wrapper.find('.nc-slideshow__link--left').trigger('click')
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
        debugger
        wrapper.vm.resizeSlide()
      })
    })
  })
})
