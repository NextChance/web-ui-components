/* eslint-disable no-debugger */
import { mount } from '@vue/test-utils'
import ncModal from '@/components/nc-modal.vue'

describe('ncModal set 1', () => {
  const calculateContentHeight = jest.fn()
  const resizeModal = jest.fn()
  const showCloseIcon = true
  const opened = true
  const hideHeader = true
  const hideFooter = false
  const padding = '50px'
  const marginTop = '0'
  const width = '200px'
  const noVerticallyAligned = false
  const height = '630px'
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
        width: width,
        height: height
      },
      methods: {
        calculateContentHeight,
        resizeModal
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
    expect(wrapper.props().height).toBe(height)
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
  const calculateContentHeight = jest.fn()
  const resizeModal = jest.fn()
  const showCloseIcon = true
  const opened = true
  const hideHeader = true
  const hideFooter = false
  const padding = '50px'
  const marginTop = '0'
  const width = '200px'
  const noVerticallyAligned = false
  const height = '630px'
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
        width: width,
        height: height
      },
      methods: {
        calculateContentHeight,
        resizeModal
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

describe('ncModal set 3 testing resizeModal methods', () => {
  const calculateContentHeight = jest.fn()
  const showCloseIcon = true
  const opened = true
  const hideHeader = true
  const hideFooter = false
  const padding = '50px'
  const marginTop = '0'
  const width = '200px'
  const noVerticallyAligned = false
  const height = '630px'
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
        width: width,
        height: height
      },
      methods: {
        calculateContentHeight
      }
    })
  })

  it('resizeModal method calls getWindowWidth method', () => {
    let stub = jest.fn()
    wrapper.setMethods({ getWindowWidth: stub })
    wrapper.vm.resizeModal()
    expect(stub).toBeCalled()
  })

  it('resizeModal method calls getDesktopDevice method', () => {
    let stub = jest.fn()
    wrapper.setMethods({ getDesktopDevice: stub })
    wrapper.vm.resizeModal()
    expect(stub).toBeCalled()
  })

  it('resizeModal method calls calculateContentHeight method', () => {
    let stub = jest.fn()
    const getDesktopDevice = jest.fn()
    getDesktopDevice.mockReturnValue(true)
    wrapper.setMethods({ getDesktopDevice: getDesktopDevice })
    wrapper.setMethods({ calculateContentHeight: stub })
    wrapper.vm.resizeModal()
    expect(stub).toBeCalled()
  })

  it('resizeModal method changes props if component is displayed in desktop ', () => {
    const getDesktopDevice = jest.fn()
    const top = '0'
    const left = '0'
    const transform = 'translate(0, 0)'
    const changedTop = '50%'
    const changedLeft = '50%'
    const changedTransform = 'translate(-50%, -50%)'
    getDesktopDevice.mockReturnValue(false)
    wrapper.setMethods({ getDesktopDevice: getDesktopDevice })
    wrapper.setProps({ padding: padding })
    wrapper.setProps({ top: top })
    wrapper.setProps({ left: left })
    wrapper.vm.resizeModal()
    expect(wrapper.vm.transform).toBe(changedTransform)
    expect(wrapper.vm.top).toBe(changedTop)
    expect(wrapper.vm.left).toBe(changedLeft)
    expect(wrapper.vm.transform).toBe(transform)
    expect(wrapper.vm.widthByDevice).toBe(width)
    expect(wrapper.vm.heightByDevice).toBe(height)
  })
})
