<template>
  <div class="nc-list">
    <nc-text-input
      v-show="hasSearch"
      v-model="search"
      class="nc-list__search"
      has-icon-left
      :label="searchLabel"
      hide-floating-placeholder
      has-icon-right
      has-icon-right-on-focus
      @input-right-icon-event="clearInput"
    >
      <template v-slot:iconLeft>
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+CiAgPHBhdGggZmlsbD0iI0FBQUFBQSIgZD0iTTIxLjEzNCAxOS4zNzZsNC4xOTkgNC4xOTktMS43NTggMS43NTgtNC4xOTktNC4xOTlhOCA4IDAgMSAxIDEuNzU3LTEuNzU3em0tNi40NjcuNzY0YTUuNDc0IDUuNDc0IDAgMSAwIDAtMTAuOTQ5IDUuNDc0IDUuNDc0IDAgMCAwIDAgMTAuOTQ5eiIvPgo8L3N2Zz4K"
          class="nc-list__search__icon search-icon"
        >
      </template>
      <template v-slot:iconRight>
        <button class="nc-list__search__button-delete">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOSIgZmlsbD0iI0Q4RDhEOCIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMyNzI3MjciIGQ9Ik0xMS4wODMgMy43MzNMMTAuMjY3IDIuOTE3IDcgNi4xODMgMy43MzMgMi45MTcgMi45MTcgMy43MzMgNi4xODMgNyAyLjkxNyAxMC4yNjcgMy43MzMgMTEuMDgzIDcgNy44MTcgMTAuMjY3IDExLjA4MyAxMS4wODMgMTAuMjY3IDcuODE3IDd6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1IDUpIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
            class="nc-list__search__icon delete-icon"
          >
        </button>
      </template>
    </nc-text-input>
    <ul v-if="items.length" class="nc-list__items">
      <li
        v-for="(item, index) in filteredList"
        class="nc-list__item"
        :key="index"
        :style="itemStyle"
        @click="onItemSelected(item, index)"
        @keyup.enter="onItemSelected(item, index)"
        tabindex="0"
      >
        <div class="nc-list__item-slot">
          <slot :item="item"></slot>
        </div>
        <div
          class="nc-list__item-checked"
          v-if="showCheckedIcon && item.id === itemSelected"
          :style="checkIconStyle"
        >
          <slot name="check-icon">
            <img class="check-icon"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTS0zMTctMTc1SDQzdjYzNWgtMzYweiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNFMTVFNUQiIGQ9Ik05LjAxNyAxMy43MUwxNy4yNDQgNiAxOSA3LjY0NSA5LjAxNyAxNyA0IDEyLjNsMS43NTYtMS42NDZ6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo="
            >
          </slot>
        </div>
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
    cleanSearch: {
      type: Boolean,
      default: false
    },
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
    showCheckedIcon: {
      type: Boolean,
      default: false
    },
    itemStyle: {
      type: Object,
      default: () => {}
    },
    checkIconStyle: {
      type: Object,
      default: () => {}
    },
    selected: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      search: '',
      itemSelected: ''
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.itemSelected = this.selected
    })
  },
  computed: {
    filteredList() {
      if (!this.search) {
        return this.items
      }
      const searchValue = this._itemParser(this.search)
      return this.items.filter(item => {
        let itemSearched
        let hasResult = false
        if (typeof item.searchText === 'string') {
          itemSearched = this._itemParser(item.searchText)
        } else if (typeof item.name === 'string') {
          itemSearched = this._itemParser(item.name)
        }
        hasResult = itemSearched.includes(searchValue)
        return hasResult
      })
    }
  },

  methods: {
    onItemSelected(item) {
      this.itemSelected = item.id
      this.$emit('item-selected', item)
    },
    _itemParser(item) {
      return item
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    },
    clearInput() {
      this.search = ''
    }
  },

  watch: {
    cleanSearch() {
      if (this.cleanSearch) {
        this.search = ''
      }
    },
    selected() {
      this.itemSelected = this.selected
    }
  }
}
</script>

<style lang="scss">
$iconColor: #ccc;
.nc-list {
  &__search {
    margin-bottom: 16px;
    &__icon {
      display: block;
      width: 24px;
      height: 24px;
    }

    &__button-delete {
      margin-right: 14px;
    }

    .search-icon {
      margin-left: 14px;
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
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    height: 46px;
    cursor: pointer;

    &-slot {
      flex: 0 1 100%;
      text-align: left;
    }
  }

  &__item-checked {
    position: absolute;
    top: 10px;
    right: 0;
    margin-right: 20px;
    &-check-icon {
      flex: 0 1 auto;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
