<template>
  <div>
    <h1>NC_TEXT_INPUT</h1>
    <br/>
    <h2>TEXT INPUT WITH VALIDATION</h2>
    <div class="nc-text-input-container">
      <nc-text-input
        :error=error
        label='e-mail'
        @input='inputChangeHandler'
      >
      </nc-text-input>
    </div>
    <hr />
    <br />
    <h2>TEXT INPUT LOCATION</h2>
    <div class="nc-text-input-container">
      <nc-text-input
        :has-icon-left='true'
      >
        <template v-slot:iconLeft>
          <i class="fas fa-search-location"></i>
        </template>
      </nc-text-input>
    </div>
    <hr />
    <br />
    <h2>TEXT INPUT LOCATION WITH DELETE OPTION</h2>
    <div class="nc-text-input-container">
      <nc-text-input
        :has-icon-left='true'
        :has-icon-right='true'
        :has-icon-right-on-focus='true'
        :icon-right-has-pointer='true'
        @input-right-icon-event='onClickDeleteIcon'
        v-model='newValueToDelete'
      >
        <template v-slot:iconLeft>
          <i class="fas fa-search-location"></i>
        </template>
        <template v-slot:iconRight>
          <i class="fas fa-times-circle"></i>
        </template>
      </nc-text-input>
    </div>
    <hr />
    <br />
    <h2>TEXT INPUT WITH INFORMATION ICON</h2>
    <div class="nc-text-input-container">
      <nc-text-input
        :has-icon-right='true'
      >
        <template v-slot:iconRight>
         <div class="icon-right">
            <i class="fas fa-question-circle"></i>
          </div>
        </template>
      </nc-text-input>
    </div>
    <hr />
    <br />
    <h2>TEXT INPUT PHONE</h2>
    <div class="nc-text-input-container">
      <nc-text-input
        :has-icon-left='true'
        input-type='tel'
        label='Número de teléfono'
      >
        <template v-slot:iconLeft>
          <div
            class="nc-phone-input country-code">
            <img 
              class="nc-phone-input flag"
              src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNUU3QzUwNTE3ODcxMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNUU3QzUwNjE3ODcxMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY1RTdDNTAzMTc4NzExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY1RTdDNTA0MTc4NzExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hN0M3QAAAeBJREFUeNrElk2L00AYx3+TTCw1adndLlS2KLv4Ug+CeBCk4s1v4cWLn8WLNz+B38GbXrysKOxBVFwRXRXStbiktcFmW5IZn5qCwgYRUpqBITPPPOT/vP5n1K5/LgS2ZMasZjRk9vViwV/flYA7VDR0+rMabH1qLasEWM0eO+N/5Ve7FqXztU0hzdQycGPt7ZjiIzs3S+YGRFENK/vW5hQvkoVZnJUJNcMC6Tz66zCdOTx/EDA4qpElE9rNjN49Qz0Q5CPRccsAF40AwvfimGeoZSkfXkoAOgHtbo1RGBEJbmdb9I6XDSyF/v30NpOPdYb9dzSCLa7dvs+ZXsynw0fo7CsdPSgV6pO9NM/dDPzxBeyry7wRz/eabQ5HG0y/XWXy+Qr+8LzkoVyedSGwmBMLIGdnXBcj9t9anr1+yCX3AJ8uyXHjT/HZZQHPfyQ5NBcNU0+RSLPdaod44QGD8Q/8uzs4616uZ8t43CyQ1mG01hfPXHo34UW3ixvVudF6wm7rC9YRezdFLylBINlTdZJAxBPl5iFXvpIeFg8dIRI3xY7lMFUYI3tVgkD27nSKq07lLJFZB+2kv2WpcXFVHmNjy3G8Tgb6P9TcpXO19nxTySVR3X28ePI0Vvz0iX8JMADE1p16B3U5CwAAAABJRU5ErkJggg=="
            />
            <span 
              class="nc-phone-input code-number"
            >+34</span>
          </div>
        </template>
      </nc-text-input>
    </div> <hr />
    <br />
    <h2>CUSTOMIZED TEXT INPUT</h2>
    <div class="nc-text-input-container">
      <nc-text-input
        container-border-color='purple'
        container-is-focus-border-color='green'
        input-content-is-focus-label-color='blue'
        input-content-label-color='pink'
        error-color='yellow'
        :has-icon-right='true'
      >
        <template v-slot:iconRight>
         <div class="icon-right">
            <i class="fas fa-question-circle"></i>
          </div>
        </template>
      </nc-text-input>
    </div>
  </div>
</template>

<script>
import ncTextInput from '@/components/nc-text-input.vue'

export default {
  components: {
    ncTextInput
  },
  data() {
    return {
      newValueToDelete: null,
      error: null
    }
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    inputChangeHandler(value) {
      if(value !== '') {
        this.error = !this.validateEmail(value) ? 'wrong e-mail' : null
      }
    },
    onClickDeleteIcon() {
      this.newValueToDelete = ''
    }
  }
}
</script>

<style>
.nc-text-input-container {
  width: 300px;
  margin: auto;
}
.nc-text-input-container i {
  color: #aaaaaa;
}
.nc-text-input-container i.fa-search-location {
  font-size: 24px;
}
.nc-text-input-container .icon-right {
  margin-right: 5px;
}
.nc-text-input-container i.fa-search-circle {
  font-size: 20px;
}

.nc-phone-input {
  display: flex;
}
.nc-phone-input.country-code {
  display: flex;
  align-items: center;
  padding-left: 7px;
  padding-right: 15px;
  height: 17px;
  align-items: center;
}

.nc-phone-input .code-number {
  width: 18px;
  height: 22px;
  font-size: 17px;
}

.nc-phone-input .flag {
  color: #272727;
  font-size: 15px;
  width: 19px;
  height: 14px;
}
</style>
