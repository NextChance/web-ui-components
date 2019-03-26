<template>
  <div class="home">
    <h1>COMPONENTS</h1>
    <h2>DUMB COMPONENT</h2>
    <Dumb />
    <hr />
    <br />
    <h2>NC-LOADER COMPONENT</h2>
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
    <hr />
    <br />
    <h2>NC-LIST COMPONENT</h2>
    <div class="test">
      <nc-list :has-search="true" :items="items" @item-selected="selectItem" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Dumb from "@/components/Dumb.vue";
import ncLoader from "@/components/nc-loader.vue";
import ncList from "@/components/nc-list.vue";

export default {
  name: "home",
  components: {
    Dumb,
    ncLoader,
    ncList
  },
  data() {
    return {
      items: [
        {
          country: "Spain",
          code: "+34"
        },
        {
          country: "Sri Lanka",
          code: "+94"
        }
      ]
    };
  },
  methods: {
    selectItem(e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
};
</script>

<style>
.test {
  width: 100%;
  height: 250px;
}
</style>
