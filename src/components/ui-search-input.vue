<template>
  <div class="ui-search-input">
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
        :readonly="isReadonly"
        :placeholder="placeholder"
        class="ui-search-input__input"
        @input="handleInputFocus"
        @keyup.enter="handleSearch"
      />
      <button
        v-if="searchIsFocused || value"
        class="ui-search-input__icon-right"
        aria-label="Clear"
        @click="handleClickDelete"
      >
        <i class="b2i-close ui-search-input__icon-right__icon"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
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
      searchInput.focus()
    }
  },
  methods: {
    handleClickDelete(): void {
      this.searchIsFocused = false
      this.textValue = ''
      this.$emit('on-clear-input')
    },

    handleInputFocus(): void {
      this.searchIsFocused = true
    },

    handleSearch(ev: Event): void {
      ev.preventDefault()
      if (this.textValue !== '') {
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
    border: none;
    margin-right: $spacing-size-2;
    padding-top: $spacing-size-0;
    outline: none;
  }

  &__container {
    flex-grow: 1;
    position: relative;
    padding: $spacing-size-2 0;
  }

  &__input {
    @include body('m');
    background: $background-2;
    border: none;
    box-shadow: 0 0 0 $spacing-size-2 $background-2;
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
      font-size: $font-size-1;
    }
  }
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 $spacing-size-2 $background-2 inset !important;
}
</style>
