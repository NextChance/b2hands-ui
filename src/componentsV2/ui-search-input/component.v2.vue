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
      default: ''
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
    isFocus: {
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
      lastTextValueSent: '',
      searchIsFocused: false,
      isDelete: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(_value): void {
        if (!this.isDelete) {
          this.textValue = _value
        }
      }
    },
    isFocus: {
      handler(_value): void {
        if (_value) {
          const searchInput = this.$refs.searchInput as HTMLElement
          searchInput.focus()
        }
      }
    }
  },
  mounted() {
    if (this.hasAutoFocus) {
      const searchInput = this.$refs.searchInput as HTMLElement
      searchInput.focus()
    }
  },
  methods: {
    handleClickDelete (): void {
      this.searchIsFocused = false
      const input = this.$refs.searchInput as HTMLInputElement
      input.value = ''
      this.textValue = ''
      this.isDelete = true
      input.focus()
      this.$emit('on-clear-input')
    },

    handleInputFocus (): void {
      if (!this.isReadonly) {
        this.searchIsFocused = true
        this.$emit('on-focus-input')
      }
    },

    handleBlur (ev: Event): void {
      setTimeout(() => {
        const input = this.$refs.searchInput as HTMLElement
        if (!document.activeElement?.isEqualNode(input)) {
          this.searchIsFocused = false
          this.isDelete = false
          this.$emit('on-blur-input', ev)
        }
      }, 250)
    },

    isValidateText (text: string): boolean {
      const notEmpty = /([a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u017F]+)/
      return notEmpty.test(text) && !emojiRegex().exec(text) && !!text.trim()
    },

    handleSearch (ev: Event): void {
      this.isDelete = false
      ev.preventDefault()
      if (this.isValidateText(this.textValue)) {
        this.$emit('on-search-done', this.textValue)
        this.searchIsFocused = false
      }
    },

    handleInput (ev: Event): void {
      ev.preventDefault()
      this.isDelete = false
      if (this.textValue !== this.lastTextValueSent) {
        this.lastTextValueSent = this.textValue
        this.$emit('on-input-change', {
          textValue: this.textValue,
          isValid: this.isValidateText(this.textValue)
        })
      }
    }
  }
})
</script>
