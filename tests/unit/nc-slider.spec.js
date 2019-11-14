import { createLocalVue, mount } from '@vue/test-utils'
import ncSlider from '@/components/nc-slider.vue'
import { defaultProps, propsData } from './fixtures/nc-slider.fixture'
import Vue2TouchEvents from 'vue2-touch-events'
const localVue = createLocalVue()
localVue.use(Vue2TouchEvents)

describe('ncSlider.vue', () => {
  describe('render', () => {
    it('is rendered', () => {
      const wrapper = mount(ncSlider, {
        localVue
      })
      expect(wrapper.is(ncSlider)).toBe(true)
    })
  })

  describe('when mounted with default props', () => {
    let wrapper
    let result

    beforeAll(() => {
      wrapper = mount(ncSlider, {
        attachToDocument: true,
        localVue
      })
      result = wrapper.props()
    })

    it('should set all its default props', () => {
      expect(result).toStrictEqual(defaultProps)
    })
  })

  describe('.startDrag()', () => {
    let wrapper
    let startDrag = jest.fn()
    beforeAll(() => {
      wrapper = mount(ncSlider, {
        localVue,
        propsData: propsData,
        attachToDocument: true
      })
      wrapper.setMethods({ startDrag })
      wrapper.find('.nc-slider__icon.nc-slider__icon-max').trigger('mousedown')
    })
    it('startDrag should be called', () => {
      expect(startDrag).toBeCalled()
    })
  })

  describe('.stopDrag()', () => {
    let wrapper
    let stopDrag = jest.fn()
    beforeAll(() => {
      wrapper = mount(ncSlider, {
        localVue,
        propsData: propsData,
        attachToDocument: true
      })
      wrapper.setMethods({ stopDrag })
      wrapper.find('.nc-slider__icon.nc-slider__icon-max').trigger('mouseleave')
    })
    it('stopDrag should be called', () => {
      expect(stopDrag).toBeCalled()
    })
  })

  describe('.doDrag()', () => {
    let wrapper
    let onPanHorizontal = jest.fn()
    beforeAll(() => {
      wrapper = mount(ncSlider, {
        localVue,
        propsData: propsData,
        attachToDocument: true
      })
      wrapper.setMethods({ onPanHorizontal })
      wrapper.find('.nc-slider__icon.nc-slider__icon-max').trigger('mousemove')
    })
    it('onPanHorizontal should be called', () => {
      expect(onPanHorizontal).toBeCalled()
    })
  })
})
