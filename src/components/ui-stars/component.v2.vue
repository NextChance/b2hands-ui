<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UiStars',
  props: {
    value: {
      type: Number,
      default: 0
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    totalAmount: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick(item: number): void {
      if (this.isEditable) {
        this.$emit('on-rating-selected', item)
      }
    }
  }
})
</script>
