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
  const backgroundColor = '#fff'
  const propsData = {
    showCloseIcon: showCloseIcon,
    opened: opened,
    hideHeader: hideHeader,
    hideFooter: hideFooter,
    padding: padding,
    marginTop: marginTop,
    noVerticallyAligned: noVerticallyAligned,
    width: width,
    height: height,
    backgroundColor: backgroundColor,
    overlayStyle: undefined
  }
  let wrapper
  beforeEach(() => {
    wrapper = mount(ncModal, {
      propsData: propsData,
      methods: {
        calculateContentHeight,
        resizeModal
      }
    })
  })
  it('renders props', () => {
    expect(wrapper.props()).toStrictEqual(propsData)
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
  const noVerticallyAligned = true
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

describe('ncModal set 3 testing resizeModal method', () => {
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
      attachToDocument: true,
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

  it('resizeModal method changes props if component is displayed in mobile ', () => {
    const top = '0'
    const left = '0'
    const transform = 'translate(0, 0)'
    const width = 'calc(100vw - 100px)'
    let calculatePadding = parseInt(padding)
    calculatePadding = calculatePadding * 2
    let height = document.documentElement.clientHeight - calculatePadding + 'px'
    const getDesktopDevice = jest.fn()
    getDesktopDevice.mockReturnValue(false)
    wrapper.setMethods({ getDesktopDevice: getDesktopDevice })
    wrapper.vm.resizeModal()
    expect(wrapper.vm.transform).toBe(transform)
    expect(wrapper.vm.top).toBe(top)
    expect(wrapper.vm.left).toBe(left)
    expect(wrapper.vm.widthByDevice).toBe(width)
    expect(wrapper.vm.heightByDevice).toBe(height)
  })

  it('resizeModal method changes props if component is displayed in desktop ', () => {
    const top = '50%'
    const left = '50%'
    const transform = 'translate(-50%, -50%)'
    const getDesktopDevice = jest.fn()
    getDesktopDevice.mockReturnValue(true)
    wrapper.setMethods({ getDesktopDevice: getDesktopDevice })
    wrapper.vm.resizeModal()
    expect(wrapper.vm.transform).toBe(transform)
    expect(wrapper.vm.top).toBe(top)
    expect(wrapper.vm.left).toBe(left)
    expect(wrapper.vm.widthByDevice).toBe(width)
    expect(wrapper.vm.heightByDevice).toBe(height)
  })
})

describe('ncModal set 4 testing getDesktopDevice method', () => {
  const showCloseIcon = true
  const opened = true
  const hideHeader = false
  const hideFooter = false
  const padding = '50px'
  const marginTop = '0'
  const width = '200px'
  const noVerticallyAligned = false
  const height = '630px'
  let wrapper
  const updateWindowWidth = jest.fn()
  updateWindowWidth.mockReturnValue(769)
  beforeEach(() => {
    wrapper = mount(ncModal, {
      attachToDocument: true,
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
        updateWindowWidth
      }
    })
  })

  it('getDesktopDevice method calls updateWindowWidth method', () => {
    let stub = jest.fn()
    wrapper.setMethods({ updateWindowWidth: stub })
    wrapper.vm.resizeModal()
    expect(stub).toBeCalled()
  })

  it('should be true if windowWidth is bigger than 769', () => {
    expect(wrapper.vm.getDesktopDevice()).toBe(true)
  })
})

describe('ncModal set 5 testing getDesktopDevice method', () => {
  const showCloseIcon = true
  const opened = true
  const hideHeader = false
  const hideFooter = false
  const padding = '50px'
  const marginTop = '0'
  const width = '200px'
  const noVerticallyAligned = false
  const height = '630px'
  let wrapper
  const updateWindowWidth = jest.fn()
  updateWindowWidth.mockReturnValue(768)
  beforeEach(() => {
    wrapper = mount(ncModal, {
      attachToDocument: true,
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
        updateWindowWidth
      }
    })
  })

  it('should be true if windowWidth is bigger than 769', () => {
    expect(wrapper.vm.getDesktopDevice()).toBe(false)
  })
})

describe('ncModal set 6 testing updateWindowWidth method', () => {
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

  it('should be equal as screen window', () => {
    let windowWidth = document.documentElement.clientWidth
    expect(wrapper.vm.updateWindowWidth()).toBe(windowWidth)
  })
})
