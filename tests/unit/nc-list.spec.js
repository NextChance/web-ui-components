import { shallowMount } from '@vue/test-utils'
import ncList from '@/components/nc-list.vue'

describe('ncList', () => {
  describe('When it is rendering', () => {
    let hasSearch = true
    const items = [
      {
        country: 'SPAIN',
        code: '+34'
      },
      {
        country: 'SRI LANKA',
        code: '+94'
      }
    ]
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(ncList, {
        attachToDocument: true,
        propsData: {
          hasSearch: hasSearch,
          items: items
        }
      })
    })
    it('renders properly as a component', () => {
      expect(wrapper.is(ncList)).toBe(true)
      expect(wrapper.isVueInstance()).toBe(true)
    })
    it('renders its props', () => {
      expect(wrapper.props().hasSearch).toBe(hasSearch)
      expect(wrapper.props().items).toBe(items)
    })
  })

  describe('When calls onItemSelected', () => {
    let hasSearch = true
    const items = [
      {
        country: 'SPAIN',
        code: '+34'
      },
      {
        country: 'SRI LANKA',
        code: '+94'
      }
    ]
    const item = items[0]
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(ncList, {
        attachToDocument: true,
        propsData: {
          hasSearch: hasSearch,
          items: items
        }
      })
    })
    it('calls itemSelected when an item is clicked', () => {
      const stub = jest.fn()
      wrapper.setMethods({ onItemSelected: stub })
      wrapper.find('.nc-list__item').trigger('click')
      expect(stub).toBeCalled()
    })
    it('called itemSelected with item value from items array', () => {
      const stub = jest.fn()
      wrapper.vm.$on('item-selected', stub)
      wrapper.vm.onItemSelected(item)
      expect(stub).toBeCalledWith(item)
    })
  })

  describe('When slot has content', () => {
    let hasSearch = true
    const items = [
      {
        name: 'SPAIN',
        dialCode: '+34'
      },
      {
        name: 'SRI LANKA',
        dialCode: '+94'
      }
    ]
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(ncList, {
        attachToDocument: true,
        propsData: {
          hasSearch: hasSearch,
          items: items
        },
        scopedSlots: {
          default:
            '<div><span class="item-on-left">{{ props.name }}</span><span class="item-on-right">{{ props.dialCode }}</span></div>'
        }
      })
    })

    describe('if has search is true and first element is selected', () => {
      hasSearch = false

      it('display as li elements as items in items array if hasSearch is false', () => {
        expect(wrapper.findAll('.nc-list__item').length).toBe(2)
      })

      it('sets selected property to selected item index', () => {
        wrapper.find('.nc-list__item').trigger('click')
        expect(wrapper.vm.selected).toBe(0)
      })

    })
  })
})
