import { mount } from '@vue/test-utils'
import ncSlider from '@/components/nc-slider.vue'
import { defaultProps } from './fixtures/nc-slider.fixture'

describe('ncSlider.vue', () => {
  describe('render', () => {
    it('is rendered', () => {
      const wrapper = mount(ncSlider)
      expect(wrapper.is(ncSlider)).toBe(true)
    })
  })

  describe('when mounted with default props', () => {
    let wrapper
    let result

    beforeAll(() => {
      wrapper = mount(ncSlider)
      result = wrapper.props()
    })

    it('should set all its default props', () => {
      expect(result).toStrictEqual(defaultProps)
    })
  })
})
