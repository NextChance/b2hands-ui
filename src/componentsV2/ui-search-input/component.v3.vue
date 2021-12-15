<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue3'
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
  setup(props, { emit }) {
    const textValue = ref('')
    const searchIsFocused = ref(false)
    const searchInput = ref(null)

    const handleClickDelete = (): void => {
      const input = (searchInput as unknown) as HTMLElement
      searchIsFocused.value = false
      textValue.value = ''
      input.focus()
      emit('on-clear-input')
    }

    const handleInputFocus = (): void => {
      searchIsFocused.value = true
      emit('on-focus-input')
    }

    const handleBlur = (): void => {
      setTimeout(() => {
        const input = (searchInput as unknown) as HTMLElement
        if (!document.activeElement?.isEqualNode(input)) {
          searchIsFocused.value = false
          emit('on-blur-input')
        }
      }, 250)
    }

    const isValidateText = (text: string): boolean => {
      const notEmpty = /([a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u017F]+)/
      return notEmpty.test(text) && !emojiRegex().exec(text)
    }

    const handleSearch = (ev: Event): void => {
      ev.preventDefault()
      if (isValidateText(textValue.value)) {
        emit('on-search-done', textValue.value)
        searchIsFocused.value = false
      }
    }

    const handleInput = (ev: Event): void => {
      ev.preventDefault()
      emit('on-input-change', {
        textValue: textValue.value,
        isValid: isValidateText(textValue.value)
      })
    }

    onMounted(() => {
      if (props.hasAutoFocus) {
        const input = (searchInput as unknown) as HTMLElement
        input.focus()
      }
    })

    return {
      textValue,
      searchIsFocused,
      handleClickDelete,
      handleInputFocus,
      handleBlur,
      handleSearch,
      handleInput,
      isValidateText
    }
  }
})
</script>
