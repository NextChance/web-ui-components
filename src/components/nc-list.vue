<template>
  <div class="nc-list">
    <input
      v-show="hasSearch"
      v-model="search"
      type="text"
      class="nc-list__search"
      placeholder="Buscar" />
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
export default {
  name: 'nc-list',
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
        item.country.toLowerCase().includes(searchValue) ||
        item.code.includes(searchValue)

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
  }

  &__items {
    list-style: none;
    padding: 0;
  }
}
</style>
