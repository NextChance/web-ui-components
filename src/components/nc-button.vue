<template>
  <button
    :class="[className, 'nc-button']"
    :disabled="disabled"
    @click="callback($event)"
  >
    <slot></slot>
  </button>
  
</template>

<script>
export default {
  name: 'nc-button',
  props: {
    className: String,
    disabled: {
      type: Boolean, 
      default: false
    }
  },
  methods: {
    callback(ev) {
      this.$emit('click', ev)
    }
  }
}
</script>

<style lang="scss">
</style>
