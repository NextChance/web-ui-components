<template>
  <div class="nc-highlighted">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <title>Producto destacado</title>
      <path d="M8 1.667c.253 0 .483.142.596.368l1.72 3.439 3.78.55c.251.036.46.212.538.453.078.242.013.507-.169.684l-2.751 2.682.619 3.783c.04.25-.063.501-.27.649-.205.148-.477.166-.7.047L8 12.538l-3.363 1.784c-.223.119-.495.1-.7-.047-.207-.148-.31-.4-.27-.65l.619-3.782-2.751-2.682c-.182-.177-.247-.442-.169-.684.078-.241.287-.417.538-.453l3.78-.55 1.72-3.439c.113-.226.343-.368.596-.368z"/>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'NcHighlighted'
}
</script>
<style lang="scss" scoped>
.nc-highlighted {
  position: absolute;
  left: 0;
  top: 0;
  padding: 4px 8px 8px 4px;
  width: 16px;
  height: 16px;
  border-bottom-right-radius: 17px;
  background: #1f2d51;
  svg {
    fill: #fa5a5a;
  }
}
</style>
