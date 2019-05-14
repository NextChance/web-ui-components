<template>
  <div class="nc-list">
    <nc-text-input
      v-show="hasSearch"
      v-model="search"
      :has-icon-left='true'
      label='Buscar'>
      <template v-slot:iconLeft>
        <i class="fas fa-search-location"></i>
      </template>
    </nc-text-input>
    <ul
      v-if="items.length"
      class="nc-list__items">
      <li
        v-for="(item, index) in filteredList"
        @click="onItemSelected(item)"
        :key="index"
        class="nc-list__item">
        <slot :item="item"></slot>
      </li>
    </ul>
    <p v-else>No hay items</p>
  </div>
</template>

<script>
import ncTextInput from './nc-text-input.vue'

export default {
  name: 'nc-list',
  components: {
    ncTextInput
  },
  props: {
    hasSearch: {
      type: Boolean,
      default: false
    },
    items: Array
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    filteredList() {
      if (!this.search) return this.items
      let searchValue = this.search.toLowerCase()
      let filter = item =>
        item.name.toLowerCase().includes(searchValue) ||
        item.dialCode.includes(searchValue)

      return this.items.filter(filter)
    }
  },
  methods: {
    onItemSelected(item) {
      this.$emit('item-selected', item)
    }
  }
}
</script>

<style lang="scss">
.nc-list {
  &__search {
    margin: 10px 0 20px 0;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    width: calc(100% - 4px);
    height: 40px;
    box-sizing: border-box;
  }

  &__items {
    list-style: none;
    padding: 0;
  }
}
</style>
