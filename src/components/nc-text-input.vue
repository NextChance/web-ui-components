<template>
<div class="nc-text-input">
  <div 
    class="nc-text-input__container" 
      :class="[{
        'is-focused': isFocus,
        'has-value': hasValue,
        'has-error': error.hasError,
        'has-icon-right-on-focus': hasIconRightOnFocus
        }]"
      :style="[isFocus ? { 'border-color': containerIsFocusBorderColor } : { 'border-color': containerBorderColor }]"
      @click="focusInput"
    >
    <div class="icon-left" 
      v-if="hasIconLeft" 
      @click="leftIconHandler($event)"
    >
      <slot name="iconLeft"></slot>
    </div>
    <div class="input-content">
      <label 
        for="" 
        class="input-content__label"
        :style="[ isFocus ? {'color': inputContentIsFocusLabelColor} : {'color': inputContentLabelColor}]"
      >
        {{ label }}
      </label>
      <input 
        class="input-content__input"
        ref="inputEl"
        :type="inputType" 
        :disabled="disabled"
        :required="required"
        :name="name"
        :maxlength="maxLength"
        v-bind:value="value"
        @input="$emit('input', $event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
      >
    </div>
    <div class="icon-right" 
      v-if="hasIconRight"
      @click="rightIconHandler($event)"
    >
      <slot name="iconRight"></slot>
    </div>
  </div>
  <div 
    class="nc-text-input__error" 
    v-if="error.hasError"
    :style="{ 'color': errorColor }"
  >
    {{ $t(error.text) }}
  </div>
  <div 
    class="nc-text-input__extra-text" 
    v-if="extraText"
  >
    {{ extraText }}
  </div>
</div>
</template>

<script>
export default {
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    error: {
      type: Object,
      default: function() {
        return {
          hasError: false,
          text: ''
        }
      }
    },
    extraText: {
      type: String,
      default: '' 
    },
    containerBorderColor:{
      type: String,
      color: '$containerBorderColor'
    },
    containerIsFocusBorderColor:{
      type: String,
      color: '$containerIsFocusColor'
    },
    inputContentIsFocusLabelColor: {
      type: String,
      color: '$containerIsFocusColor'
    },
    inputContentLabelColor: {
      type: String,
      color: '$inputContentLabelColor'
    },
    errorColor: {
      type: String,
      color: '$errorColor'
    },
    hasIconLeft: {
      type: Boolean,
      default: false
    },
    hasIconRight: {
      type: Boolean,
      default: false
    },
    hasIconRightOnFocus: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: String,
    maxLength: {
      type: Number,
      default: 15,
    },
    label: {
      type: String,
      default: 'label'
    }
  },

  data() {
    return {
      isFocus: false,
      hasValue: false
    }
  },

  mounted() {
    if(this.value.length !== '') {
      this.focusInput()
    }
    //this.$emit('onValidate', this.response);
  },

  methods: {
    focusInput () {
      this.$refs.inputEl.focus()
    },

    onFocus: function () {
      this.$emit('input-focus-event')
      this.isFocus = true
    },

    onBlur: function () {
      this.$emit('input-blur-event')
      this.hasValue = (this.$refs.inputEl.value.length > 0 ? true : false)
      this.isFocus = false
    },

    leftLinkHandler(ev) {
      this.$emit('input-left-icon-event', ev)
    },
    
    rightLinkHandler(ev) {
      this.$emit('input-right-icon-event', ev)
    },
  }
}
</script>

<style lang="scss">
$containerBorderColor: #ccc;
$containerIsFocusColor: #379aaf;
$inputContentLabelColor: #999;
$errorColor: red;

.nc-text-input {
  position: relative;
  text-align: left;
  
  &__container {
    position: relative;
    border: solid 1px $containerBorderColor;
    padding: 0 8px 0 16px;
    position: relative;
    height: 60px;
    width: calc(100% - 18px);
    border-radius: 4px;
    text-align: left;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &.is-focused {
      border-color: $containerIsFocusColor;
      outline: 0;
      .input-content__label {
        color: $containerIsFocusColor;
        font-size: 70%;
        padding: 9px 0;
        z-index: 2;
      }
    }
    
    &.has-icon-right-on-focus {
      .icon-right {
        display: none;
        visibility: hidden;
      }
    }
    
    &.is-focused.has-icon-right-on-focus {
      .icon-right {
        display: block;
        visibility: visible
      }
    }

    &.has-value {
      .input-content__label {
        padding: 9px 0;
        font-size: 70%;
      }
    }

    &.has-error {
      border: 1px solid $errorColor;
    }

    .input-content {
      position: relative;
      flex-grow: 1;
      &__label {
        color: $inputContentLabelColor;
        top: 0;
        left: 0;
        position: absolute;
        transition: font 0.2s;
        padding: 19px 0;
        font-size: 17px;
      }
      
      &__input {
        padding: 27px 0 15px 0;
        height: 60px;
        width: calc(100% - 2px);
        box-sizing: border-box;
        border: none;
        background: none;
        font-size: 17px;
        z-index: 1;
        &:focus {
          outline: 0;
        }
      }
    }

    .icon-left {
      margin-right: 8px;    
      flex-grow: 0;
    }

    .icon-right {
      margin-left: 8px;
      flex-grow: 0;
    }
  }
  
  &__extra-text {
    font-size: 12px;
  }
  
  &__error {
    color: $errorColor;
    font-size: 12px;
  }
}
</style>
