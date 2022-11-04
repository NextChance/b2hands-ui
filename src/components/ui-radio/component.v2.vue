<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UiRadio',
  data() {
    return {
      id: `uiRadio-${(Math.random() * 10000).toFixed()}`
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
  methods: {
    /**
     * Close modal
     */
    onChange(value: string|number): void {
      /**
       * Close event
       *
       * @event on-change
       */
      if (!this.isDisabled) {
        this.$emit('change', value)
      }
    }
  }
})
</script>
