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
    <h1>NC_MODAL</h1>
    <nc-modal 
      :opened = opened 
      @close = "opened = false"
      :showCloseIcon = "showCloseIcon"
      :hideHeader = "hideHeader"
      :hideFooter = "hideFooter"
      :padding="padding"
      :marginTop="marginTop"
      :noVerticallyAligned="noVerticallyAligned"
      :width="width"
      :height="height"
      >
        <template v-slot:header>
          <h1>Comparte los beneficios de Billionhands</h1>
        </template>
        <template v-slot:content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
          </p>
          <p>12NYS5</p>
        </template>
        <template v-slot:footer>
          <button>Copiar código</button>
        </template>
      </nc-modal>
    <button  @click="opened = true">Show Modal</button>
  </div>
</template>


<script>
import Dumb from '@/components/Dumb.vue'
import ncLoader from '@/components/nc-loader.vue'
import ncModal from '@/components/nc-modal.vue'

export default {
  name: 'home',
  components: {
    Dumb,
    ncLoader,
    ncModal
  },
  data() {
    return {
      showCloseIcon: true,
      opened: true,
      hideHeader: false,
      hideFooter: false,
      padding: '50px',
      marginTop: '0',
      width: '588',
      height: '630px',
      noVerticallyAligned: false
    }
  }
}
</script>

<style>
.test {
  width: 100%;
  height: 250px;
}
</style>
