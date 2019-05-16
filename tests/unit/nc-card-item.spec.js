import { mount } from '@vue/test-utils'
import ncCardItem from '@/components/nc-card-item.vue'
import { defaultProps } from './fixtures/nc-card-item.fixture'

describe('ncCardItem.vue', () => {
  describe('render', () => {
    it('is rendered', () => {
      const wrapper = mount(ncCardItem)
      expect(wrapper.is(ncCardItem)).toBe(true)
    })
  })

  describe('when mounted with default props', () => {
    let wrapper
    let result

    beforeAll(() => {
      wrapper = mount(ncCardItem)
      result = wrapper.props()
    })

    it('should set all its default props', () => {
      expect(result).toStrictEqual(defaultProps)
    })
  })

  describe('.handleCardItemClicked()', () => {
    let wrapper
    let stub = jest.fn()
    beforeAll(() => {
      wrapper = mount(ncCardItem, {
        attachToDocument: true
      })
      wrapper.setMethods({ handleCardItemClicked: stub })
      wrapper.vm.$refs['cardItemRef'].click()
    })
    it('handleCardItemClicked should be called', () => {
      expect(stub).toBeCalled()
    })
  })

  describe('on click card', () => {
    let wrapper
    beforeAll(() => {
      wrapper = mount(ncCardItem, {
        attachToDocument: true
      })
      wrapper.vm.$refs['cardItemRef'].click()
    })
    it('card-item-click-event should be emitted', () => {
      expect(wrapper.emitted('card-item-click-event')).toBeTruthy()
    })
  })
})
