<template src="./index.html"></template>
<style scoped lang="scss" src="./styles.scss"></style>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'UiModal',
  props: {
    /**
     * Value that shows or hides the modal
     */
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Close modal
     */
    handleClose(): void {
      /**
       * Close event
       *
       * @event on-modal-close
       */
      this.$emit('on-modal-close')
    }
  }
})
</script>

