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
        <span class="item-on-left">{{ item.name }}</span><span class="item-on-right">{{ item.dialCode }}</span>
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
      <nc-button @button-clicked="handleClicked">
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
    <hr>
    <br />

    <h2>NC-SEPARATOR</h2>
    <p>With icon:</p>
    <nc-separator>
      <template > 
        <i class="fab fa-accusoft"></i>  
      </template>
    </nc-separator>
    <p>With text:</p>
    <nc-separator>
      <template > 
        <span>o</span>  
      </template>
    </nc-separator>

    <hr>
    <br />
    <hr />
    <br />

    <h1>NC_PHONE_INPUT</h1>
    <div class="nc-phone-input-container">
      <nc-phone-input
        :selected-country="selectedItem" />
    </div>
    <br />
    <br />
    <h1>NC_TEXT_INPUT</h1>
    <div class="home-nc-text-input-container">
      <nc-text-input/>
      <router-link to="/componentInputTypeText">See other examples</router-link>
    </div>
    <br />
    <br />
    <h1>NC_CARD-ITEM</h1>
    <div class="nc-card-item-container">
      <nc-card-item 
        :caption-style="ncCardCaptionStyle"
        :image="ncCardItemImage"
        :title="ncCardItemTitle"
        :title-line-ellipsis="ncTitleLineEllipsis"
        :description="ncCardItemDescription"
        :description-line-ellipsis="ncDescritionLineEllipsis"/>
    </div>
    <br>
    <br>
    <h1>NC_IMAGE_UPLOADER</h1>
    <router-link to="/componentImageUploader">See behaviour</router-link>
   
    <h3>Ready to upload an image</h3>
     <nc-image-uploader :is-empty="true">
      <template v-slot:isEmptyState>
        <i class="fa fa-plus-circle image-uploader__icon">
        </i> 
      </template>
      <template v-slot:isLoadingState>
        <nc-loader
          :has-text="true"
          :has-veil="true"
          :active="true"
          icon-color="#272727"
          text-color="#272727"
          veil-color="#FFF"
          :text="$t('lang.loading.msg')"
        />
      </template>
      <template v-slot:withDataState>
        <i class="fa fa-times-circle image-uploader__icon">
        </i> 
      </template>
    </nc-image-uploader>
    <br>

    <h3>Uploanding an image</h3>
    <nc-image-uploader :is-loading="true">
      <template v-slot:isEmptyState>
        <i class="fa fa-plus-circle image-uploader__icon">
        </i> 
      </template>
      <template v-slot:isLoadingState>
        <nc-loader
          :has-text="false"
          :has-veil="true"
          :active="true"
          icon-color="#272727"
          text-color="#272727"
          veil-color="#FFF"
        />
      </template>
      <template v-slot:withDataState>
        <i class="fa fa-times-circle image-uploader__icon">
        </i> 
      </template>
   </nc-image-uploader>
    <br>
    
    <h3>Uploaded image</h3>
    <nc-image-uploader 
      :with-data="true"
      bg-image="http://placekitten.com/g/500/310">
      <template v-slot:isEmptyState>
        <i class="fa fa-plus-circle image-uploader__icon">
        </i> 
      </template>
      <template v-slot:isLoadingState>
        <nc-loader
          :has-text="true"
          :has-veil="true"
          :active="true"
          icon-color="#272727"
          text-color="#272727"
          veil-color="#FFF"
          :text="$t('lang.loading.msg')"
        />
      </template>
      <template v-slot:withDataState>
        <i class="fa fa-times-circle image-uploader__icon">
        </i> 
      </template>
   </nc-image-uploader>
    <br>
     

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
import ncSeparator from '@/components/nc-separator.vue'
import ncPhoneInput from '@/components/nc-phone-input.vue'
import ncTextInput from '@/components/nc-text-input.vue'
import ncCardItem from '@/components/nc-card-item.vue'
import ncImageUploader from '@/components/nc-image-uploader.vue'

export default {
  name: 'home',
  components: {
    Dumb,
    ncLoader,
    ncList,
    ncModal,
    ncSlideshow,
    ncButton,
    ncSeparator,
    ncTextInput,
    ncPhoneInput,
    ncCardItem,
    ncImageUploader
  },
  data() {
    return {
      items: [
        {
          id: '1234567890',
          name: 'España',
          iso2: 'ES',
          dialCode: '+34'
        },
        {
          id: '2345678901',
          name: 'Estados Unidos',
          iso2: 'US',
          dialCode: '+1'
        }
      ],
      // selectedItem: {
      //   dialCode: '+1',
      //   iso2: 'US',
      //   name: 'Estados Unidos',
      //   flag: 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERTc5MkI3RjE3OEExMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERTc5MkI4MDE3OEExMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyMTE0RjIyMTc4QTExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRFNzkyQjdFMTc4QTExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+60cYSwAAAyhJREFUeNrElN1PU3cYxz/tOQUBD/aNymtbUAq2IOiUWXmZA40Iy2BzcW53y7JlyZLtZuE/8NaY7Gbe7WJbdJnTDOdQCbLKrERUotgCSodQ7AsFpK28yKT7rfsL2gv7JCcn+eV3zpPv5/l+H9X2xp65SqtJGfr1Fg3vNPD02SIhfwRniwP3pdvsOVxPaCHGs7+DOA/VJs8crXXEs3P48OfTfMIcU+SRaqlMzm8SNut2VuefIxvyydZIxFbWyX35iviLNZRiPZJaxdLyCkoiQUyc6cwFTPvC9FRkcbJMy7JaTrmxHIuvxaZm5xW7+Jl3NkKRaRt5OVlMjvuoqa9gwr9AgS4PvTYP78hjdtVVEAw9J+Kdxv7Td+hL8tGTeslGg8Jeexk3/riLs62O+cU441NBDjbZGbg+SlNbPYvRF9zzzHCoycFA/yhvCtRqnZbr5a1YEjGm5S2po1ZXfRHVaCTlWLODq24v1eWFGPVbuXH5Dh3vORm88xhziR5zoZ5rl9y0dx/ggS/EzGSQs5Ua3s39h7CUlbri0mKdUGzmijBXqzBXYH4Z931fsmlf7zBvd+wjIigMDI/TcbyRvt+GOSgUZ62uU3S2h8IdRgrTQK1S2T6PyhpZ+aB9LxcF2hpbCUUF27hy4S+Of/wWfUMeykuNVIin9/xNuj9qYWR8juknIc5szNC1voA/DdSypayAhlor57/vp/NEC7OBRfpveek+0cwvP/7JsfedhEWcLg8+pOtkMxfOuTjc5WSrSc+S6ymSQYtGyk5dsVT9/4zbhZmu3Z5IztggXOwSZjvSuZ+hUR9mEan/KAz+PkJb5z7GngSYdXu46T9Ho3EL6ZSKnZ9Fax0W5aFrDNuB6mROA6El7BYTnns+bPt3srK2gV+QcIjIPRLzrxL3ZkLLfB0c40udRCAd1EfFNioxaSG+Sl2NmchSnCKjwh6HBWlzk/rd1uTyMOTn8MbuctRiieyqLKbKbqXs4gSvQmFephOnRCIRFW+F11yyp/3TtD/eSKjYTM4rjcZh110yUZlDPfnVqcwovkppRhRnDrX/2x+UjKDuJXcuE4r/FWAAjBMttNdoYOEAAAAASUVORK5CYII='
      // },
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
      },
      ncCardItemImage:
        'https://cdn-images-1.medium.com/max/800/1*-PlqbnwqjqJi_EVmrhmuDQ.jpeg',
      ncCardItemDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Excepteur sint occaecat cupidatat non proident, sunt',
      ncCardItemTitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      ncCardCaptionStyle: {
        'position': 'absolute',
        'bottom': '10px',
        'right': '10px',
      },
      ncDescritionLineEllipsis: 2,
      ncTitleLineEllipsis: 1
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
.nc-phone-input-container {
  display: flex;
  justify-content: center;
}
.nc-button-container button {
  margin: 10px;
}
.home-nc-text-input-container {
  width: 300px;
  margin: auto;
}
.nc-card-item-container {
  width: 220px;
  margin: auto;
  font-size: 17px;
  border-radius: 8px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
}


</style>
