<template>
<div class="nc-textarea">
  <div 
    class="nc-textarea__container" 
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
      <textarea 
        v-model="inputValue"
        class="input-content__input"
        :class="inputClasses"
        :disabled="disabled"
        :id="id"
        :maxlength="maxLength"
        :name="name"
        :ref="uiReference"
        :required="required"
        rows="4"
        cols="50"
        @input="handleInput"
        @keyup="handleKeyUp"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
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
    class="nc-textarea__error" 
    v-if="error"
    :style="{ 'color': errorColor }"
  >
    {{ $t(error) }}
  </div>
  <div 
    class="nc-textarea__extra-text" 
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
    label: {
      type: String,
      default: 'label'
    },
    maxLength: {
      type: Number,
      default: 1000
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
      inputValue: ''
    }
  },

  computed: {
    hasValue: function() {
      return !!this.inputValue
    }
  },

  created() {
    if (this.value) this.inputValue = this.value
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
      this.isFocused = true
    },

    handleBlur: function(ev) {
      this.$emit('input-blur-event', ev)
      this.isFocused = false
    },

    handleInput() {
      this.$emit('input', this.$refs[this.uiReference].value)
    },

    handleKeyUp(ev) {
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
$containerIsFocusedColor: #379aaf;
$inputContentLabelColor: #999;
$errorColor: red;

.nc-textarea {
  position: relative;
  text-align: left;

  &__container {
    position: relative;
    border: solid 1px $containerBorderColor;
    box-sizing: border-box;
    padding: 0 8px 0 16px;
    position: relative;
    height: 110px;
    width: 100%;
    border-radius: 4px;
    text-align: left;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &.is-focused {
      border-color: $containerIsFocusedColor;
      outline: 0;
      .input-content__label {
        color: $containerIsFocusedColor;
        font-size: 70%;
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
        font-size: 70%;
      }
    }

    &.has-error {
      border: 1px solid $errorColor;
    }

    .input-content {
      position: relative;
      flex-grow: 1;
      padding-top: 17px;
      &__label {
        color: $inputContentLabelColor;
        top: 0;
        left: 0;
        position: absolute;
        transition: font 0.2s;
        font-size: 17px;
      }

      &__input {
        padding: 0;
        height: 76px;
        width: calc(100% - 44px);
        box-sizing: border-box;
        border: none;
        background: none;
        font-size: 17px;
        resize:none;
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