<template>
  <button
    :class="[className, 'nc-button']"
    :disabled="disabled"
    @click="handleClicked($event)"
  >
    <slot></slot>
  </button>

</template>

<script>
export default {
  name: 'nc-button',
  props: {
    /***
     * List of class
     */
    className: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClicked(ev) {
      this.$emit('button-clicked', ev)
    }
  }
}
</script>

<style lang="scss">
</style>
