<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { defineComponent, ref } from 'vue3'
import emojiRegex from 'emoji-regex'

export default defineComponent({
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
  setup ({ props }, emit) {
    const textValue = ref('')
    const searchIsFocused = ref(false)
    const searchInput = ref(null)

    const handleClickDelete = (): void => {
      searchIsFocused.value = false
      textValue.value = '';
      (searchInput as HTMLElement).focus()
      emit('on-clear-input')
    }

    const handleInputFocus = (): void => {
      searchIsFocused.value = true
      emit('on-focus-input')
    }

    const handleBlur = (): void => {
      setTimeout(() => {
        if (!document.activeElement?.isEqualNode(searchInput as HTMLElement)) {
          searchIsFocused.value = false
          emit('on-blur-input')
        }
      }, 250)
    }

    const handleChange = (): void => {
      emit('on-change-input', textValue)
    }

    const handleSearch = (ev: Event): void => {
      const notEmpty = /([a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u017F]+)/
      ev.preventDefault()
      if (notEmpty.test(textValue) && !emojiRegex().exec(textValue)) {
        emit('on-search-done', textValue)
        searchIsFocused.value = false
      }
    }


    return {
      textValue,
      searchIsFocused,
      handleClickDelete,
      handleInputFocus,
      handleBlur,
      handleChange,
      handleSearch
    }
  }
})
</script>
