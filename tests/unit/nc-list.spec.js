import { shallowMount } from '@vue/test-utils'
import ncList from '@/components/nc-list.vue'

describe('ncList', () => {
  describe('When it is render', () => {
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

  describe('When  calls itemSelected', () => {
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
      wrapper.setMethods({ itemSelected: stub })
      wrapper.find('.nc-list__item').trigger('click')
      expect(stub).toBeCalled()
    })
    it('called itemSelected with item value from items array', () => {
      const stub = jest.fn()
      wrapper.vm.$on('item-selected', stub)
      wrapper.vm.itemSelected(item)
      expect(stub).toBeCalledWith(item)
    })
  })

  describe('When slot has content', () => {
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
        },
        scopedSlots: {
          default:
            '<div><span class="item-on-left">{{ props.country }}</span><span class="item-on-right">{{ props.code }}</span></div>'
        }
      })
    })
    it('display as li elements as items in items array if hasSearch is false', () => {
      hasSearch = false
      expect(wrapper.findAll('.nc-list__item').length).toBe(2)
    })
    it('display as li elements as items in items array if search value is empty', () => {
      wrapper.find('.nc-list__search').setValue('')
      expect(wrapper.findAll('.nc-list__item').length).toBe(2)
    })
    it('filters items and return SRI LANKA if search value is k', () => {
      expect(wrapper.findAll('.nc-list__item').length).toBe(2)
      wrapper.find('.nc-list__search').setValue('k')
      expect(wrapper.vm.filteredList[0].country).toBe('SRI LANKA')
    })
  })
})
