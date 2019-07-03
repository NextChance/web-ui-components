import { shallowMount } from '@vue/test-utils'
import ncImageUploader from '@/components/nc-image-uploader.vue'

describe('ncImageUploader.vue', () => {
  it('is rendered', () => {
    const wrapper = shallowMount(ncImageUploader)
    expect(wrapper.is(ncImageUploader)).toBe(true)
  })
})
