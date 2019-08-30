import { mount } from '@vue/test-utils'
import ncCouponItem from '@/components/nc-coupon-item.vue'
import { defaultProps } from './fixtures/nc-coupon-item.fixture'

describe('ncCouponItem.vue', () => {
  describe('render', () => {
    it('is rendered', () => {
      const wrapper = mount(ncCouponItem)
      expect(wrapper.is(ncCouponItem)).toBe(true)
    })
  })

  describe('when mounted with default props', () => {
    let wrapper
    let result

    beforeAll(() => {
      wrapper = mount(ncCouponItem)
      result = wrapper.props()
    })

    it('should set all its default props', () => {
      expect(result).toStrictEqual(defaultProps)
    })
  })

  describe('.handleCouponItemClicked()', () => {
    let wrapper
    let stub = jest.fn()
    beforeAll(() => {
      wrapper = mount(ncCouponItem, {
        attachToDocument: true
      })
      wrapper.setMethods({ handleCouponItemClicked: stub })
      wrapper.vm.$refs['couponItemRef'].click()
    })
    it('handleCouponItemClicked should be called', () => {
      expect(stub).toBeCalled()
    })
  })

  describe('on click card', () => {
    let wrapper
    beforeAll(() => {
      wrapper = mount(ncCouponItem, {
        attachToDocument: true
      })
      wrapper.vm.$refs['couponItemRef'].click()
    })
    it('card-item-click-event should be emitted', () => {
      expect(wrapper.emitted('coupon-item-click-event')).toBeTruthy()
    })
  })
})
