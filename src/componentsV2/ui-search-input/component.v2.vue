<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

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

    handleChange(): void {
      this.$emit('on-change-input', this.textValue)
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
