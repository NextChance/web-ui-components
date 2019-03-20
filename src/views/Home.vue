<template>
  <div class="home">
    <h1>DUMB COMPONENT</h1>
    <Dumb />
    <hr />
    <br />
    <h1>NC-SPINNER COMPONENT</h1>
    <div class="test"><nc-spinner /></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Dumb from "@/components/Dumb.vue";
import ncSpinner from "@/components/nc-spinner.vue";

export default {
  name: "home",
  components: {
    Dumb,
    ncSpinner
  }
};
</script>

<style>
.test {
  width: 100%;
  height: 250px;
}
</style>
