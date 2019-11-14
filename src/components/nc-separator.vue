<template>
    <div class="nc-separator" :style="{'color':color}">
      <div class="nc-separator__line" :style="{'border-color':colorLine}"/>
      <div class="nc-separator__content" :style="{'background-color':colorBackground}">
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
      default: 'red'
    },
    colorLine: {
      type: String,
      default: '$line'
    },
    colorBackground: {
      type: String,
      default: '$background'
    }
  }
}
</script>
<style lang="scss">
/*Colors*/
$element: grey;
$line: grey;
$background: white;
.nc-separator {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 35px;
    position: relative;
    width: 100%;

    &__line {
      border-top: 1px solid $line;
      position: absolute;
      width: 100%;
    }

    &__content {
    background-color: $background;
    height: auto;
    padding: 0 25px;
    position: absolute;
    width: auto;
    z-index: 2;
    }
  }
</style>


