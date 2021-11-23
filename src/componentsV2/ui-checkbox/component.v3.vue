<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { defineComponent} from 'vue3'

export default defineComponent({
  name: '',
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isSchrodinger: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  emits: [
    'change'
  ],
  setup (props, { emit }) {

    const onChange = ($event: Event): void => {
      if (!props.isDisabled) {
        emit('change', ($event.currentTarget as HTMLInputElement)?.value)
      }
    }
    return {
      onChange
    }
  }
})
</script>
