<template>
  <ul class="nc-dropdown-item__container">
    <li class="nc-dropdown-item__element"> 
      <!-- si el slot tiene texto y poner clase -->
      <span>
        <slot class="nc-dropdown-item__element-text" name="nc-dropdown-item__element-text">texto del item</slot>
      </span>
      <!-- si  tiene icono y poner clase -->
      <span class="nc-dropdown-item__element-icon fab fa-chevron-down" name="nc-dropdown-item__element-icon">   
      </span>
    </li>
  </ul>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>

.nc-dropdown-item__element {
  height: 100px;
  width: 90%;
  margin-left: auto;
  padding-left: 20px;

  &.nc-dropdown-item__element  {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .nc-dropdown-item__element-icon {
      margin-left: auto; /* no tira*/
    }
  }
  border-bottom: 1px solid green;
  &::after{
    content: '';
    border-bottom: 1px solid #ccc;

  }
}

</style>



