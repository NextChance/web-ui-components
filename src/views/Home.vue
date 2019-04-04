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
    <hr />
    <br />
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
      :overlayStyle="modalOverlayStyle"
      >
        <template v-slot:header>
          <h1>Comparte los beneficios de Billionhands</h1>
        </template>
        <template v-slot:content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>12NYS5</p>
        </template>
        <template v-slot:footer>
          <button>Copiar código</button>
        </template>
      </nc-modal>
    <button  @click="opened = true">Show Modal</button>

    <hr />
    <br />
    <h1>NC_BUTTON</h1>
    <div class="nc-button-container">
      <nc-button @click="onClickButton">
        <template>Basic Button</template>
      </nc-button>
      <nc-button  @click="onClickButton">
        <template>
          <i class="fas fa-plus-circle"></i>
          Icon Button
        </template>
      </nc-button>
      <nc-button
        :disabled=true
        @click="clickButton">
        <template>
          Disabled Button
        </template>
      </nc-button>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import Dumb from '@/components/Dumb.vue'
import ncLoader from '@/components/nc-loader.vue'
import ncList from '@/components/nc-list.vue'
import ncModal from '@/components/nc-modal.vue'
import ncButton from '@/components/nc-button.vue'

export default {
  name: 'home',
  components: {
    Dumb,
    ncLoader,
    ncList,
    ncModal,
    ncButton
  },
  data() {
    return {
      items: [
        {
          country: 'Spain',
          code: '+34'
        },
        {
          country: 'Sri Lanka',
          code: '+94'
        }
      ],
      showCloseIcon: true,
      hideHeader: false,
      hideFooter: false,
      opened: false,
      padding: '50px',
      marginTop: '0',
      width: '588px',
      height: '630px',
      noVerticallyAligned: false,
      modalOverlayStyle: {
        background: '#FFF'
      }
    }
  },
  methods: {
    selectItem(ev) {
      // eslint-disable-next-line no-console
      console.log(ev)
    },
    clickButton(ev) {
      // eslint-disable-next-line no-console
      console.log(ev)
    }
  }
}
</script>

<style>
.test {
  width: 100%;
  height: 250px;
}
.nc-button-container button {
  margin: 10px;
}
</style>
