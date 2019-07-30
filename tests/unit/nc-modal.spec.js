/* eslint-disable no-debugger */
import { mount } from '@vue/test-utils'
import ncModal from '@/components/nc-modal.vue'

describe('ncModal set 1', () => {
  const calculateContentHeight = jest.fn()
  const resizeModal = jest.fn()
  const showCloseIcon = true
  const opened = true
  const showHeader = true
  const showFooter = false
  const padding = '50px'
  const width = '200px'
  const noVerticallyAligned = false
  const height = '630px'
  const backgroundColor = '#fff'
  const zIndexHeader = 1
  const propsData = {
    showCloseIcon: showCloseIcon,
    opened: opened,
    showHeader: showHeader,
    showFooter: showFooter,
    padding: padding,
    noVerticallyAligned: noVerticallyAligned,
    width: width,
    height: height,
    backgroundColor: backgroundColor,
    overlayStyle: undefined,
    zIndexHeader: zIndexHeader
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

  it('changes props in computed method with opened = true', () => {
    expect(wrapper.vm.visibility).toBe('visible')
    expect(wrapper.vm.display).toBe('block')
  })

  it('changes props in computed method with opened = false', () => {
    wrapper.setProps({ opened: false })
    expect(wrapper.vm.visibility).toBe('hidden')
    expect(wrapper.vm.display).toBe('none')
  })

  it('calls handleCloseModal on click close icon', () => {
    const stub = jest.fn()
    wrapper.setMethods({ handleCloseModal: stub })
    wrapper.find('.nc-modal__close-icon').trigger('click')
    expect(stub).toBeCalled()
  })

  it('calls handleCloseModal with true value', () => {
    const stub = jest.fn()
    wrapper.vm.$on('handleCloseModal', stub)
    wrapper.vm.handleCloseModal()
    expect(wrapper.emitted()['close'][0]).toEqual([true])
  })
})

describe('ncModal testing resizeModal method', () => {
  const calculateContentHeight = jest.fn()
  const showCloseIcon = true
  const opened = true
  const showHeader = true
  const showFooter = false
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
        showHeader: showHeader,
        showFooter: showFooter,
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
    const width = 'calc(100vw - 100px)'
    let calculatePadding = parseInt(padding)
    calculatePadding = calculatePadding * 2
    let height = document.documentElement.clientHeight - calculatePadding + 'px'
    const getDesktopDevice = jest.fn()
    getDesktopDevice.mockReturnValue(false)
    wrapper.setMethods({ getDesktopDevice: getDesktopDevice })
    wrapper.vm.resizeModal()
    expect(wrapper.vm.widthByDevice).toBe(width)
    expect(wrapper.vm.heightByDevice).toBe(height)
  })

  it('resizeModal method changes props if component is displayed in desktop ', () => {
    const getDesktopDevice = jest.fn()
    getDesktopDevice.mockReturnValue(true)
    wrapper.setMethods({ getDesktopDevice: getDesktopDevice })
    wrapper.vm.resizeModal()
    expect(wrapper.vm.widthByDevice).toBe(width)
    expect(wrapper.vm.heightByDevice).toBe(height)
  })
})

describe('ncModal set 4 testing getDesktopDevice method', () => {
  const showCloseIcon = true
  const opened = true
  const showHeader = true
  const showFooter = true
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
        showHeader: showHeader,
        showFooter: showFooter,
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
  const showHeader = false
  const showFooter = false
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
        showHeader: showHeader,
        showFooter: showFooter,
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
  const showHeader = true
  const showFooter = false
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
        showHeader: showHeader,
        showFooter: showFooter,
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
