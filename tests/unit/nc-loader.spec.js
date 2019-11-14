import { shallowMount } from '@vue/test-utils'
import ncLoader from '@/components/nc-loader.vue'

describe('ncLoader', () => {
  it('renders props', () => {
    const text = 'loading'
    const active = true
    const hasText = true
    const hasVeil = true
    const veilColor = '#272727'
    const textColor = '#272728'
    const iconColor = '#272729'
    const propsData = {
      text: text,
      active: active,
      hasText: hasText,
      hasVeil: hasVeil,
      veilColor: veilColor,
      textColor: textColor,
      iconColor: iconColor
    }
    const wrapper = shallowMount(ncLoader, {
      propsData: propsData
    })
    expect(wrapper.props()).toStrictEqual(propsData)
  })
})
