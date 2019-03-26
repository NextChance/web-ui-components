/* eslint-disable no-debugger */
import { mount } from '@vue/test-utils'
import ncModal from '@/components/nc-modal.vue'

describe('ncModal set 1', () => {
  const showCloseIcon = true
  const opened = true
  const hideHeader = false
  const hideFooter = false
  const padding = '50px'
  const marginTop = '0'
  const width = '200'
  const noVerticallyAligned = false
  let wrapper
  beforeEach(() => {
    wrapper = mount(ncModal, {
      propsData: {
        showCloseIcon: showCloseIcon,
        opened: opened,
        hideHeader: hideHeader,
        hideFooter: hideFooter,
        padding: padding,
        marginTop: marginTop,
        noVerticallyAligned: noVerticallyAligned,
        width: width
      }
    })
  })
  it('renders props', () => {
    expect(wrapper.props().showCloseIcon).toBe(showCloseIcon)
    expect(wrapper.props().opened).toBe(opened)
    expect(wrapper.props().hideHeader).toBe(hideHeader)
    expect(wrapper.props().hideFooter).toBe(hideFooter)
    expect(wrapper.props().padding).toBe(padding)
    expect(wrapper.props().marginTop).toBe(marginTop)
    expect(wrapper.props().noVerticallyAligned).toBe(noVerticallyAligned)
    expect(wrapper.props().width).toBe(width)
  })

  it('changes props in mounted method', () => {
    let top = '50%'
    let transform = 'translate(-50%, -50%)'
    expect(wrapper.vm.top).toBe(top)
    expect(wrapper.vm.transform).toBe(transform)
  })

  it('changes props in computed method with opened = true', () => {
    expect(wrapper.vm.visibility).toBe('visible')
    expect(wrapper.vm.display).toBe('block')
  })

  it('changes props in computed method with opened = false', () => {
    wrapper.setProps({ opened: false })
    expect(wrapper.vm.visibility).toBe('hidden')
    expect(wrapper.vm.display).toBe('none')
  })

  it('calls close on click close icon', () => {
    const stub = jest.fn()
    wrapper.setMethods({ close: stub })
    wrapper.find('.nc-modal__close-icon').trigger('click')
    expect(stub).toBeCalled()
  })

  it('calls close with true value', () => {
    const stub = jest.fn()
    wrapper.vm.$on('close', stub)
    wrapper.vm.close()
    expect(stub).toBeCalledWith(true)
  })
})

describe('ncModal set 2 (not vertically aligned)', () => {
  const showCloseIcon = true
  const opened = true
  const hideHeader = false
  const hideFooter = false
  const padding = '50px'
  const marginTop = '0'
  const width = '200'
  const noVerticallyAligned = true
  let wrapper
  beforeEach(() => {
    wrapper = mount(ncModal, {
      propsData: {
        showCloseIcon: showCloseIcon,
        opened: opened,
        hideHeader: hideHeader,
        hideFooter: hideFooter,
        padding: padding,
        marginTop: marginTop,
        noVerticallyAligned: noVerticallyAligned,
        width: width
      }
    })
  })

  it('changes props in mounted method', () => {
    let top = '0'
    let transform = 'translate(-50%, 0)'
    expect(wrapper.vm.top).toBe(top)
    expect(wrapper.vm.transform).toBe(transform)
  })
})
