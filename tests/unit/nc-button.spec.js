import { mount } from '@vue/test-utils'
import ncButton from '@/components/nc-button.vue'

describe('ncButton', () => {
  const defaultProps = {
    className: undefined,
    disabled: false
  }

  describe('When is mounted without props', () => {
    let wrapper
    let result
    beforeAll(() => {
      wrapper = mount(ncButton)
      result = wrapper.props()
    })

    it('should set all its default props', () => {
      expect(result).toStrictEqual(defaultProps)
    })

    it('button on clik should call the onClick function', () => {
      let stub = jest.fn()
      wrapper.setMethods({ onClick: stub })
      wrapper.find('.nc-button').trigger('click')
      expect(stub).toBeCalled()
    })
  })

  describe('.callback()', () => {
    let wrapper
    beforeAll(() => {
      wrapper = mount(ncButton)
      wrapper.find('.nc-button').trigger('click')
    })

    it('should emit the event click', () => {
      expect(wrapper.emitted('click')).toBeTruthy()
    })
  })
})
