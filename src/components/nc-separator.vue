<template>
    <div class="nc-separator" :style="{'color':color}">
      <div class="nc-separator__line"/>
      <div class="nc-separator__content">
        <slot></slot>
      </div>
    </div>
</template>
<script>
export default {
  name: 'nc-separator',  

  props: {
    color: {
      type: String,
      default: 'grey'
    }
  }
}
</script>
<style lang="scss">
.nc-separator {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 35px;
    position: relative;
    width: 100%;

    &__line {
      border-top: 1px solid grey;
      position: absolute;
      width: 100%;
    }

    &__content {
    background-color: #ffffff;
    height: auto;
    padding: 0 25px;
    position: absolute;
    width: auto;
    z-index: 2;
    }
  }
</style>


