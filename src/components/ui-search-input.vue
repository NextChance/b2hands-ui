<template>
  <div class="ui-search-input accept-key-press">
    <slot>
      <button
        id="searchButton"
        aria-label="Search"
        class="ui-search-input__icon-left"
        @click="handleSearch"
      >
        <i class="b2i-search"></i>
      </button>
    </slot>
    <div class="ui-search-input__container">
      <label :for="id" :v-if="labelText" class="ui-search-input__label">
        {{ labelText }}
      </label>
      <input
        :id="id"
        ref="searchInput"
        v-model="textValue"
        :disabled="disabled"
        :type="type"
        enterKeyHint="search"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        :readonly="isReadonly"
        :placeholder="placeholder"
        :maxlength='limitCharacter'
        class="ui-search-input__input"
        @focus="handleInputFocus"
        @blur="handleBlur"
        @keyup.enter="handleSearch"
      />
      <button
        v-show="searchIsFocused || value"
        class="ui-search-input__icon-right"
        aria-label="Clear"
        @click="handleClickDelete"
      >
        <i class="b2i-cancel ui-search-input__icon-right__icon"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import emojiRegex from 'emoji-regex'

export default Vue.extend({
  name: 'UiSearchInput',
  props: {
    id: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    isReadonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    labelText: {
      type: String,
      default: ''
    },
    hasAutoFocus: {
      type: Boolean,
      default: false
    },
    limitCharacter: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      textValue: '',
      searchIsFocused: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(_value): void {
        this.textValue = _value
      }
    }
  },
  mounted() {
    if (this.hasAutoFocus) {
      (this.$refs.searchInput as HTMLElement).focus()
    }
  },
  methods: {
    handleClickDelete(): void {
      this.searchIsFocused = false
      this.textValue = '';
      (this.$refs.searchInput as HTMLElement).focus()
      this.$emit('on-clear-input')
    },

    handleInputFocus(): void {
      this.searchIsFocused = true
      this.$emit('on-focus-input')
    },

    handleBlur(): void {
      setTimeout(() => {
        if (!document.activeElement?.isEqualNode(this.$refs.searchInput as HTMLElement)) {
          this.searchIsFocused = false
          this.$emit('on-blur-input')
        }
      }, 250)
    },

    handleSearch(ev: Event): void {
      const notEmpty = /([a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u017F]+)/
      ev.preventDefault()
      if (notEmpty.test(this.textValue) && !emojiRegex().exec(this.textValue)) {
        this.$emit('on-search-done', this.textValue)
        this.searchIsFocused = false
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.ui-search-input {
  background: $background-2;
  border-radius: $spacing-size-1;
  box-sizing: border-box;
  display: flex;
  height: $spacing-size-8;
  padding: 0 $spacing-size-5 0 $spacing-size-4;
  position: relative;
  width: 100%;

  &__icon-left {
    background: none;
    border: 0;
    margin-right: $spacing-size-2;
    outline: none;
    padding-top: $spacing-size-0;
  }

  &__container {
    flex-grow: 1;
    padding: $spacing-size-2 0;
    position: relative;
  }

  &__input {
    @include body('m');

    background: $background-2;
    border: 0;
    box-shadow: 0 0 0 $spacing-size-2 $background-2;
    color: $black-100;
    outline: none;
    padding: 0;
    width: 100%;

    &::placeholder {
      color: $black-70;
    }
  }

  &__icon-right {
    background: inherit;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    &__icon {
      color: $black-60;
      display: block;
      font-size: $font-size-4;
    }
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  box-shadow: 0 0 0 $spacing-size-2 $background-2 inset !important;
}
</style>
