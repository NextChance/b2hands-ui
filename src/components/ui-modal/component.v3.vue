<template src="./index.html"></template>
<style scoped lang="scss" src="./styles.scss"></style>
<script lang="ts">
import { defineComponent } from 'vue3'
export default defineComponent({
  name: 'UiModal',
  props: {
    /**
     * Value that shows or hides the modal
     */
    isOpen: {
      type: Boolean,
      default: false
    },
    hasHeader: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'on-modal-close'
  ],
  setup (props, { emit }) {
    const handleClose = (): void => {
      /**
       * Close event
       *
       * @event on-modal-close
       */
      emit('on-modal-close')
    }
    return {
      handleClose
    }
  }
})
</script>
