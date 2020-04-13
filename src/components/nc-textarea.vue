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
        :style="{'height': textAreaHeight}"
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
  >
    {{ $t(computedError.text, computedError.variables) }}
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
      default: ''
    },
    containerIsFocusedBorderColor: {
      type: String,
      default: ''
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
    wrapperClasses: String,
    isAutoResizable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isFocused: false,
      inputValue: '',
      textAreaHeight: ''
    }
  },

  computed: {
    hasValue: function() {
      return !!this.inputValue
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
    if (this.value) this.inputValue = this.value
  },

  mounted() {
    const uiElement = this.$refs[this.uiReference]
    this.handleAutoResize()
    if (uiElement.value !== '') {
      this.value = uiElement.value
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
      this.handleAutoResize()
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
    },

    handleAutoResize() {
      if (this.isAutoResizable) {
        this.textAreaHeight = '0px'
        this.$nextTick(function() {
          this.textAreaHeight = this.$refs[this.uiReference].scrollHeight + 'px'
        })
      }
    }
  }
}
</script>

<style lang="scss">
$containerBorderColor: #d8d8d8;
$containerIsFocusedColor: #379aaf;
$inputContentLabelColor: #aaaaaa;
$errorColor: red;

.nc-textarea {
  position: relative;
  text-align: left;

  &__container {
    border: solid 1px $containerBorderColor;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 32px 16px 16px;
    position: relative;
    min-height: 110px;
    position: relative;
    text-align: left;
    width: 100%;

    &.is-focused {
      border-color: $containerIsFocusedColor;
      outline: 0;

      .input-content__label {
        color: $containerIsFocusedColor;
        font-size: 70%;
        margin-bottom: 8px;
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
        margin-bottom: 8px;
      }
    }

    &.has-error {
      border: 1px solid $errorColor;
    }

    .input-content {
      height: 100%;
      position: relative;

      &__label {
        bottom: 100%;
        color: $inputContentLabelColor;
        font-size: 17px;
        left: 0;
        position: absolute;
        transition: font 0.2s, margin 0.2s;
      }

      &__input {
        box-sizing: border-box;
        background: none;
        border: none;
        font-size: 17px;
        height: 66px;
        resize: none;
        padding: 0;
        width: 100%;
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
