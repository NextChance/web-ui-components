<template>
  <ul class="nc-dropdown-item__container " > 
    <div class="nc-dropdown-item__header" @click="toggle()">
        <p class="nc-dropdown-item__header-text"> 
        BILLION 
      </p>
      <i :class="['fas fa-chevron-down nc-dropdown-item__header-icon', isOpen ? 'transformed' : '']"></i>
    </div>
    <div v-if="isOpen"
    class="nc-dropdown-item_content">
      <li class="nc-dropdown-item__element"         
        :key="index"
        v-for="(item, index) in options" 
        @click="set(item)"> 
        <span>{{item}} </span>
        <span 
          @click="rotateIcon()"
          name="nc-dropdown-item__element-icon"></span>
      </li>
    </div>
  </ul>
</template>
<script>
export default {
  name: 'nc-dropdown-item',
 
  props: {
    options: Array,
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      rotateIcon();
    },
    rotateIcon() {
      this.isRotate = !this.isRotate
    }
  },
}
</script>
<style lang="scss" scoped>

.nc-dropdown-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nc-dropdown-item__header-icon {
  margin-left: auto;
  padding: 0 20px;
}

.nc-dropdown-item__element {
  height: 100px;
  width: 90%;
  margin-left: auto;
  padding-left: 20px;
  
  & .nc-dropdown-item__element-icon {
    margin-left: auto; 
  }
 
  &::after{
    content: '';
  }
}

.nc-dropdown-item__container {
  text-align: left;
    width: 80%;
   border-bottom: 1px solid #ccc;

}
.nc-dropdown-item_content {
  display: block;
  height: 500px;
  width: 75%;
  background-color: green;
  margin-left: auto;
}
.transformed {
    animation: rotate .5s linear;
    animation-fill-mode: forwards;
}
@-webkit-keyframes rotate {
  0% { transform: rotate(0deg)}
  100% {transform: rotate(180deg)}
}
</style>



