<template>
<div class="nc-text-input">
  <div 
    class="nc-text-input__container" 
      :class="[{
        'is-focused': isFocused,
        'has-value': hasValue,
        'has-error': error,
        'has-icon-right-on-focus': hasIconRightOnFocus,
        wrapperClasses
        }]"
      :style="[isFocused ? { 'border-color': containerIsFocusedBorderColor } : { 'border-color': containerBorderColor }, hasValue ? 'has-value' : '']"
      @click="focusInput"
    >
    <div 
      :class="['icon-left', {'has-pointer': iconLeftHasPointer}]" 
      v-if="hasIconLeft" 
      @click="handleIconLeft($event)"
    >
      <slot name="iconLeft"></slot>
    </div>
    <div class="input-content">
      <label 
        class="input-content__label"
        :style="[ isFocused ? {'color': inputContentIsFocusedLabelColor} : {'color': inputContentLabelColor}]"
      >
        {{ label }}
      </label>
      <input 
        v-model="inputValue"
        class="input-content__input"
        :class="inputClasses"
        :disabled="disabled"
        :id="id"
        :maxlength="maxLength"
        :name="name"
        :ref="uiReference"
        :required="required"
        :size="size"
        :type="inputType" 
        @input="handleInput"
        @keyup="handleKeyUp"
        @focus="handleFocus"
        @blur="handleBlur"
      >
    </div>
    <div 
      :class="['icon-right', {'has-pointer': iconRightHasPointer}]" 
      v-if="hasIconRight"
      @click="handleIconRight($event)"
    >
      <slot name="iconRight"></slot>
    </div>
  </div>
  <div 
    class="nc-text-input__error" 
    v-if="error"
    :style="{ 'color': errorColor }"
  >
    {{ $t(error) }}
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
    containerBorderColor: {
      type: String,
      default: '$containerBorderColor'
    },
    containerIsFocusedBorderColor: {
      type: String,
      default: '$containerIsFocusedColor'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    errorColor: {
      type: String,
      default: '$errorColor'
    },
    extraText: {
      type: String,
      default: ''
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
    iconLeftHasPointer: {
      type: Boolean,
      default: false
    },
    id: String,
    inputClasses: String,
    inputContentIsFocusedLabelColor: {
      type: String,
      default: '$containerIsFocusedColor'
    },
    inputContentLabelColor: {
      type: String,
      default: '$inputContentLabelColor'
    },
    inputOptions: {
      type: Object,
      default: () => ({})
    },
    iconRightHasPointer: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: 'label'
    },
    maxLength: {
      type: Number,
      default: 15
    },
    name: String,
    required: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 35
    },
    uiReference: {
      type: String,
      default: 'uiEl'
    },
    value: [String, Number],
    wrapperClasses: String
  },

  data() {
    return {
      isFocused: false,
      hasValue: false,
      inputValue: ''
    }
  },

  created() {
    if (this.value) {
      this.inputValue = this.value
      this.hasValue = true
    }
  },

  mounted() {
    if (this.$refs[this.uiReference].value !== '') {
      this.value = this.$refs[this.uiReference].value
      this.focusInput()
    }
  },

  watch: {
    value() {
      this.inputValue = this.value
    }
  },

  methods: {
    focusInput() {
      this.$refs[this.uiReference].focus()
    },

    handleFocus: function() {
      this.$emit('input-focus-event')
      this.isFocus = true
    },

    handleBlur: function(ev) {
      this.$emit('input-blur-event', ev)
      this.isFocus = false
    },

    handleInput() {
      this.$emit('input', this.$refs[this.uiReference].vke)
    },

    handleKeyUp(ev) {
      this.hasValue =
        this.$refs[this.uiReference].value.length > 0 ? true : false
      this.$emit('input-key-up-event', ev)
    },

    handleIconLeft(ev) {
      this.$emit('input-left-icon-event', ev)
    },

    handleIconRight(ev) {
      this.$emit('input-right-icon-event', ev)
    }
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

    &.has-value.has-icon-right-on-focus {
      .icon-right {
        display: block;
        visibility: visible;
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
      &.has-pointer {
        cursor: pointer;
      }
    }

    .icon-right {
      margin-left: 8px;
      flex-grow: 0;
      &.has-pointer {
        cursor: pointer;
      }
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
