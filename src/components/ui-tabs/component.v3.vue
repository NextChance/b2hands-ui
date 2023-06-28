<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script setup lang="ts">
import { computed, defineProps, defineEmits, nextTick, ref, watch } from 'vue3'
import UiScrollableList from '../ui-scrollable-list/component.v3.vue'
import type { UiTab } from '@/external/types/Components'

const props = defineProps({
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
})

const emit = defineEmits(['on-tab-clicked'])
const container = ref<HTMLElement | null>(null)
const activeTabIndex = ref(-1)
const windowScreenWidth = ref(0)
const scrollOnList = ref(0)
const uiTab = ref<Array<HTMLElement> | null>(null)

watch(() => props.activeTabId, (newValue: string, oldValue: string | undefined) => {
  if (newValue) {
    const _activeTabIndex = props.tabs.findIndex((tab: any) => (tab as UiTab).id === newValue)
    nextTick(() => {
      activeTabIndex.value = _activeTabIndex !== -1 ? _activeTabIndex : 0

      const tabsRef = uiTab.value as Array<HTMLElement>
      if (tabsRef) {
        const activeTabRef: HTMLElement = tabsRef[activeTabIndex.value] as HTMLElement
        const gapOffset = 12
        scrollOnList.value = activeTabRef.offsetLeft + activeTabRef.offsetWidth + gapOffset
      }
    })
  }
}, {
  immediate: true
})

watch(() => props.tabs, (newValue: any) => {
  if (newValue) {
    if (newValue.length && !props.activeTabId) {
      activeTabIndex.value = 0
    }
  }
}, {
  immediate: true
})

const markerProperties = computed(() => {
  if (uiTab && Array.isArray(uiTab)) {
    const activeTabRef: HTMLElement = uiTab[activeTabIndex.value] as HTMLElement
    return {
      windowScreenWidth: windowScreenWidth,
      index: activeTabIndex,
      left: activeTabRef.offsetLeft,
      width: activeTabRef.clientWidth
    }
  } else {
    return {
      windowScreenWidth: windowScreenWidth,
      index: activeTabIndex,
      left: 0,
      width: 0
    }
  }
})

const handleTabClick = (tab: string) => {
  emit('on-tab-clicked', tab)
}
</script>
