/* eslint-disable no-debugger */
import { mount } from '@vue/test-utils'
import ncModal from '@/components/nc-modal.vue'

const selectors = {
  closeIcon: '.nc-modal__close-icon',
  header: '.nc-modal__header',
  footer: '.nc-modal__footer',
  overlay: '.nc-modal__overlay'
}

describe('ncModal default behavior', () => {
  const defaultProps = {
    hideCloseIcon: false,
    hasHeader: false,
    hasFooter: false,
    closeEventName: 'close',
    closeOnOverlayClick: false
  }
  let wrapper

  beforeEach(() => {
    wrapper = mount(ncModal)
  })

  it('renders props', () => {
    expect(wrapper.props()).toStrictEqual(defaultProps)
  })

  it('close-icon should exist by default', () => {
    expect(wrapper.find(selectors.closeIcon).exists()).toBeTruthy()
  })

  it('header should not exist by default', () => {
    expect(wrapper.find(selectors.header).exists()).toBeFalsy()
  })

  it('footer should not exist by default', () => {
    expect(wrapper.find(selectors.footer).exists()).toBeFalsy()
  })

  it('close-icon click fire the close event', () => {
    wrapper.find(selectors.closeIcon).trigger('click')
    expect(wrapper.emitted(defaultProps.closeEventName)).toBeTruthy()
  })

  it('closeOnOverlayClick should not work by default', () => {
    wrapper.find(selectors.overlay).trigger('click')
    expect(wrapper.emitted(defaultProps.closeEventName)).toBeFalsy()
  })
})

describe('ncModal with custom props', () => {
  const customProps = {
    hideCloseIcon: true,
    hasHeader: true,
    hasFooter: true,
    closeEventName: 'custom-close-event-name',
    closeOnOverlayClick: true
  }
  let wrapper

  beforeEach(() => {
    wrapper = mount(ncModal, {
      propsData: customProps
    })
  })

  it('renders custom props', () => {
    expect(wrapper.props()).toStrictEqual(customProps)
  })

  it('close-icon should be hidden', () => {
    expect(wrapper.find(selectors.closeIcon).exists()).toBeFalsy()
  })

  it('header should exists', () => {
    expect(wrapper.find(selectors.header).exists()).toBeTruthy()
  })

  it('footer should exists', () => {
    expect(wrapper.find(selectors.footer).exists()).toBeTruthy()
  })

  it('closeOnOverlayClick should fire the close event', () => {
    wrapper.find(selectors.overlay).trigger('click')
    expect(wrapper.emitted(customProps.closeEventName)).toBeTruthy()
  })
})
