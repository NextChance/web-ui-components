<template>
  <div class="home">
    <h1>DUMB COMPONENT</h1>
    <Dumb />
    <hr />
    <br />
    <h1>NC-LOADER COMPONENT</h1>
    <div class="test">
      <nc-loader
        :has-text="true"
        :has-veil="true"
        :active="true"
        icon-color="#272727"
        text-color="#272727"
        veil-color="#FFF"
        :text="$t('lang.loading.msg')"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Dumb from '@/components/Dumb.vue'
import ncLoader from '@/components/nc-loader.vue';

export default {
  name: 'home',
  components: {
    Dumb,
    ncLoader
  }
}
</script>

<style>
.test {
  width: 100%;
  height: 250px;
}
</style>
