<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { defineComponent} from 'vue3'

export default defineComponent({
  name: '',
  props: {
    /**
     * Sets input name
     */
    name: {
      type: String,
      default: ''
    },
    /**
     * Sets input value
     */
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * Sets input checked status
     */
    isChecked: {
      type: Boolean,
      default: false
    },
    /**
     * Sets input checked status
     */
    isDisabled: {
      type: Boolean,
      default: false
    },
    /**
     * Text to show beside radio
     */
    label: {
      type: String,
      default: ''
    }
  },
  emits: [
    'change'
  ],
  setup (props, { emit }) {

    const onChange = (value: string|number): void => {
      if (!props.isDisabled) {
        emit('change', value)
      }
    }
    return {
      onChange
    }
  }
})
</script>
