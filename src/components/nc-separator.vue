<template>
    <div class="nc-separator">
      <div class="nc-separator__line"/>
      <div class="nc-separator__content">
        <slot></slot>
      </div>
    </div>
</template>
<script>
export default {
  name: 'nc-separator',  
}
</script>
<style lang="scss">
.nc-separator {
    position: relative;
    margin-bottom: 35px;
    color: grey;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__line {
      position: absolute;
      width: 100%;
      border-top: 1px solid grey;
    }

    &__content {
    padding: 0 25px;
    height: auto;
    width: auto;
    position: absolute;
    background-color: #ffffff;
    z-index: 2;
    }
  }

</style>


