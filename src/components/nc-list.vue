<template>
  <div class="nc-list">
    <nc-text-input
      v-show="hasSearch"
      v-model="search"
      class="nc-list__search"
      :has-icon-left="true"
      :label="searchLabel"
    >
      <template v-slot:iconLeft>
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+CiAgPHBhdGggZmlsbD0iI0FBQUFBQSIgZD0iTTIxLjEzNCAxOS4zNzZsNC4xOTkgNC4xOTktMS43NTggMS43NTgtNC4xOTktNC4xOTlhOCA4IDAgMSAxIDEuNzU3LTEuNzU3em0tNi40NjcuNzY0YTUuNDc0IDUuNDc0IDAgMSAwIDAtMTAuOTQ5IDUuNDc0IDUuNDc0IDAgMCAwIDAgMTAuOTQ5eiIvPgo8L3N2Zz4K"
          class="search-icon"
        >
      </template>
    </nc-text-input>
    <ul v-if="items.length" class="nc-list__items">
      <li
        v-for="(item, index) in filteredList"
        @click="onItemSelected(item, index)"
        :key="index"
        :class="{highlighted: index === selected}"
        :style="itemStyle"
        class="nc-list__item"
      >
        <slot :item="item"></slot>
      </li>
    </ul>
    <p v-else>{{ textEmptyList }}</p>
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
    items: Array,
    textEmptyList: {
      type: String,
      default: 'There are no items'
    },
    searchLabel: {
      type: String,
      default: 'buscar'
    },
    itemStyle: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      search: '',
      selected: undefined
    }
  },
  computed: {
    filteredList() {
      if (!this.search) {
        return this.items
      }
      const searchValue = this.search.toLowerCase()
      return this.items.filter(item => {
        if (typeof item.searchText === 'string') {
          return item.searchText.toLowerCase().includes(searchValue)
        } else if (typeof item.name === 'string') {
          return item.name.toLowerCase().includes(searchValue)
        } else {
          return false
        }
      })
    }
  },
  methods: {
    onItemSelected(item, index) {
      this.selected = index
      this.$emit('item-selected', item)
    }
  }
}
</script>

<style lang="scss">
$iconColor: #ccc;
.nc-list {
  &__search {
    margin-bottom: 16px;
    .search-icon {
      margin-left: 14px;
      display: block;
      width: 24px;
      height: 24px;
    }
    .nc-text-input__container {
      border-radius: 25px;
      height: 50px;
      padding: 14px 0;
    }
  }

  &__items {
    list-style: none;
    padding: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    height: 46px;

    &.highlighted {
      background-color: #ebebeb;
    }
  }
}
</style>
