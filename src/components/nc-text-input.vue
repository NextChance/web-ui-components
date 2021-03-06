<template>
<div class="nc-text-input">
  <div
    class="nc-text-input__container"
      :class="[{
        'is-focused': isFocused,
        'has-value': hasValue,
        'has-error': error,
        'has-icon-right-on-focus': hasIconRightOnFocus,
        'hide-floating-placeholder': hideFloatingPlaceholder,
        wrapperClasses
        }]"
      :style="[isFocused ? { 'border-color': containerIsFocusedBorderColor } : { 'border-color': containerBorderColor }]"
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
      >
        {{ label }}
      </label>
      <input
        class="input-content__input"
        :class="[
          inputClasses,
          {
            'disable-spinButton': disableSpinButton,
            'input-content__input--disabled': disabled
          }
        ]"
        :disabled="disabled"
        :id="id"
        :maxlength="maxLength"
        :name="name"
        :ref="uiReference"
        :required="required"
        :size="size"
        :type="inputType"
        :value="value"
        :readonly="isReadonly"
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
  >
    {{ $t(computedError.text, computedError.variables) }}
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
    disableSpinButton: {
      type: Boolean,
      default: true
    },
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
      type: [String, Object],
      default: ''
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
    value: {
      type: String,
      default: ''
    },
    wrapperClasses: String,
    hideFloatingPlaceholder: {
      type: Boolean,
      default: false
    },
    isReadonly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isFocused: false
    }
  },

  computed: {
    hasValue: function() {
      return !!this.value
    },
    computedError: function() {
      return typeof this.error === 'string'
        ? {
          text: this.error,
          variables: {}
        }
        : this.error
    }
  },

  created() {
    if (this.value) this.value = this.value.trim()
  },

  mounted() {
    if (this.$refs[this.uiReference].value !== '') {
      this.value = this.$refs[this.uiReference].value.trim()
      this.focusInput()
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
$containerBorderColor: #d8d8d8;
$containerIsFocusedColor: #379aaf;
$inputContentLabelColor: #aaaaaa;
$errorColor: red;

.nc-text-input {
  position: relative;
  text-align: left;

  &__container {
    position: relative;
    border: solid 1px $containerBorderColor;
    box-sizing: border-box;
    padding: 0 8px 0 16px;
    position: relative;
    height: 60px;
    width: 100%;
    border-radius: 4px;
    text-align: left;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &.is-focused {
      border-color: $containerIsFocusedColor;
      outline: 0;
      &:not(.hide-floating-placeholder) {
        .input-content__label {
          color: $containerIsFocusedColor;
          font-size: 70%;
          padding: 9px 0;
          z-index: 2;
        }
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
      &:not(.hide-floating-placeholder) {
        .input-content__label {
          padding: 9px 0;
          font-size: 70%;
        }
      }
      &.hide-floating-placeholder {
        .input-content__label {
          display: none;
        }
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
        z-index: 2;
      }

      &__input {
        padding: 27px 0 15px 0;
        height: 58px;
        width: calc(100% - 2px);
        box-sizing: border-box;
        border: none;
        background: none;
        font-size: 17px;
        z-index: 1;
        transform: translateZ(0);

        &:focus {
          outline: 0;
        }

        &--disabled {
          color: #aaaaaa;
        }
      }
    }

    &.hide-floating-placeholder {
      .input-content__input {
        padding: 0;
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
    margin-top: 4px;
  }

  &__error {
    color: $errorColor;
    font-size: 12px;
    margin-top: 4px;
  }

  .disable-spinButton::-webkit-inner-spin-button,
  .disable-spinButton::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
