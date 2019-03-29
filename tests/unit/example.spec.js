import { shallowMount } from '@vue/test-utils'
import Dumb from '@/components/Dumb.vue'

describe('Dumb.vue', () => {
  it('is rendered', () => {
    const wrapper = shallowMount(Dumb)
    expect(wrapper.is(Dumb)).toBe(true)
  })
})
