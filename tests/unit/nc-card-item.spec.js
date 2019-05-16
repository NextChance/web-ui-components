import { mount } from '@vue/test-utils'
import ncCardItem from '@/components/nc-card-item.vue'

describe('ncCardItem.vue', () => {
  it('is rendered', () => {
    const wrapper = mount(ncCardItem)
    expect(wrapper.is(ncCardItem)).toBe(true)
  })
})
