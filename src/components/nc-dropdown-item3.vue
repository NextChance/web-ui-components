<template>
  <ul class="dropdown_container">
    <div class="dropdown_header" @click="toggle()">
      <p > BILLION </p>
      <i class="fas fa-chevron-down"></i>
    </div>
    <div>
      <li class="dropdown-list-item"
        :key="index"
        v-for="(item, index) in options">
      {{item}}
      </li>
    </div>

  </ul>
</template>
<script>
export default {
  name: 'nc-dropdown-item',
  props: {
    options: Array
  },
}
</script>


<style lang="scss" scoped>



</style>



