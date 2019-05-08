import { shallowMount } from '@vue/test-utils'
import ncSeparator from '@/components/nc-separator.vue'

describe('ncSeparator.vue', () => {
  it('is rendered', () => {
    const wrapper = shallowMount(ncSeparator)
    expect(wrapper.is(ncSeparator)).toBe(true)
  })
})
