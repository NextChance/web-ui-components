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
    <div class="nc-list-container">
      <nc-list 
        :has-search="true" 
        :items="items"
        @item-selected="onItemSelected"
      >
      <template slot-scope="{item}">
        <span class="item-on-left">{{ item.country }}</span><span class="item-on-right">{{ item.code }}</span>
      </template>
      </nc-list>
    </div>
    <hr />
    <br />
    <h1>NC_MODAL</h1>
    <nc-modal 
      :opened = opened 
      @close = "opened = false"
      :showCloseIcon = "showCloseIcon"
      :showHeader = "showHeader"
      :showFooter = "showFooter"
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
    <h2>NC-SLIDESHOW COMPONENT</h2>
    <div class="slideshow">
      <nc-slideshow
        :has-link-right="true"
        :has-link-left="true"
        :links-default-action="true"
        @slideshow-click-left-link="clickSlideshowLinkLeft"
        @slideshow-click-right-link="clickSlideshowLinkRight"
        @slideshow-last-slide="lastSlide"
        @slideshow-first-slide="firstSlide">
        <template>        
          <li class="item">
            SLIDE 1
          </li>
          <li class="item">
            SLIDE 2
          </li>
          <li class="item">
            SLIDE 3
          </li>
        </template>
      </nc-slideshow> 
    </div>
    <hr />
    <br />
    <h1>NC_BUTTON</h1>
    <div class="nc-button-container">
      <nc-button @button-clicked="handleClicked">
        <template>Basic Button</template>
      </nc-button>
      <nc-button  @button-clicked="handleClicked">
        <template>
          <i class="fas fa-plus-circle"></i>
          Icon Button
        </template>
      </nc-button>
      <nc-button
        :disabled=true
        @click="handleClicked">
        <template>
          Disabled Button
        </template>
      </nc-button>
    </div>
    <hr />
    <br />
    <h1>NC_TEXT_INPUT</h1>
    <div class="home-nc-text-input-container">
      <nc-text-input/>
      <router-link to="/componentInputTypeText">See other examples</router-link>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import Dumb from '@/components/Dumb.vue'
import ncLoader from '@/components/nc-loader.vue'
import ncList from '@/components/nc-list.vue'
import ncModal from '@/components/nc-modal.vue'
import ncSlideshow from '@/components/nc-slideshow.vue'
import ncButton from '@/components/nc-button.vue'
import ncTextInput from '@/components/nc-text-input.vue'

export default {
  name: 'home',
  components: {
    Dumb,
    ncLoader,
    ncList,
    ncModal,
    ncSlideshow,
    ncButton,
    ncTextInput
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
      showHeader: false,
      showFooter: true,
      opened: false,
      padding: '34px',
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
    handleClicked(ev) {
      // eslint-disable-next-line no-console
      console.log(ev)
    },
    clickSlideshowLinkLeft(ev) {
      // eslint-disable-next-line no-console
      console.log('left', ev.currentTarget)
    },
    clickSlideshowLinkRight(ev) {
      // eslint-disable-next-line no-console
      console.log('right', ev.currentTarget)
    },
    lastSlide(ev) {
      // eslint-disable-next-line no-console
      console.log('last-slide', ev.currentTarget)
    },
    firstSlide(ev) {
      // eslint-disable-next-line no-console
      console.log('first-slide', ev.currentTarget)
    }
  }
}
</script>

<style scoped>
.test {
  width: 100%;
  height: 250px;
}
.slideshow {
  width: 80vw;
  height: 30vh;
  overflow: hidden;
  margin: auto;
}
.nc-button-container button {
  margin: 10px;
}
.home-nc-text-input-container {
  width: 300px;
  margin: auto;
}
</style>
