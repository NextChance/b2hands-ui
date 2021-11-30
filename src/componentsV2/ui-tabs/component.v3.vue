<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue3'
import UiScrollableList from '../ui-scrollable-list/component.v3.vue'
import { UiTab } from '@/external/types/Components'

export default defineComponent({
  name: 'UiTabs',
  components: {
    'ui-scrollable-list': UiScrollableList
  },
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
    const container = ref(null)
    const activeTabIndex = ref(-1)
    const windowScreenWidth = ref(0)
    const scrollOnList = ref(0)
    const uiTab = ref(null)

    const markerProperties = computed(() => {
      if (uiTab && Array.isArray(uiTab)) {
        const activeTabRef: HTMLElement = uiTab[activeTabIndex] as HTMLElement
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

    watch(props.activeTabId, (newValue: string, oldValue: string | undefined) => {
      if (newValue) {
        const activeTabIndex = props.tabs.findIndex((tab: any) => (tab as UiTab).id === newValue)
        nextTick(() => {
          activeTabIndex.value = activeTabIndex !== -1 ? activeTabIndex : 0

          const tabsRef = uiTab as Array<any>
          if (tabsRef) {
            const activeTabRef: HTMLElement = tabsRef[activeTabIndex] as HTMLElement
            const gapOffset = 12
            scrollOnList.value = activeTabRef.offsetLeft + activeTabRef.offsetWidth + gapOffset
          }
        })
      }
    }, {
      immediate: true
    })

    watch(props.tabs, (newValue: string) => {
      if (newValue) {
        if (newValue.length && !props.activeTabId) {
          activeTabIndex.value = 0
        }
      }
    }, {
      immediate: true
    })

    const handleTabClick = (tab: string) => {
      emit('on-tab-clicked', tab)
    }
    return {
      container,
      activeTabIndex,
      windowScreenWidth,
      scrollOnList,
      markerProperties,
      handleTabClick
    }
  }
})
</script>
