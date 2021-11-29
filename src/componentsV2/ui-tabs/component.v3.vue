<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { defineComponent} from 'vue3'

export default defineComponent({
  name: 'UiTabs',
  props: {
    tabs: {
      type: Array,
      default: () => ([])
    },
    activeTabId: {
      type: String,
      default: ''
    },
    hasScroll: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const handleTabClick = (tab: string) => {
      emit('on-tab-clicked', tab)
    }
    return {
      handleTabClick
    }
  }
})
</script>
