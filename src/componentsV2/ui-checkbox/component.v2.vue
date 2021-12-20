<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UiCheckbox',
  data() {
    return {
      id: `uiCheckbox-${(Math.random() * 10000).toFixed()}`
    }
  },
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
      type: String,
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
     * Sets input indeterminated status when is used as a grouping check and children are in different states
     */
    isSchrodinger: {
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
  methods: {
    /**
     * Close modal
     */
    onChange($event: Event): void {
      /**
       * Close event
       *
       * @event on-change
       */
      if (!this.isDisabled) {
        this.$emit('change', ($event.currentTarget as HTMLInputElement)?.value)
      }
    }
  }
})
</script>
