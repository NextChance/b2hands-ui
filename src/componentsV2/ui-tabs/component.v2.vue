<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import AnyObject from '../../types/AnyObject'
import { UiTab } from '@/types/Components'
import UiScrollableList from './ui-scrollable-list.vue'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  components: {
    UiScrollableList
  }
})
export default class UiTabs extends Vue {
  container: HTMLElement | null = null
  activeTabIndex: number = -1
  windowScreenWidth: number = 0
  scrollOnList: number = 0

  @Prop({ default: () => [] }) tabs!: Array<UiTab>
  @Prop({ default: '' }) activeTabId!: string
  @Prop({ default: false }) hasScroll!: boolean

  get markerProperties (): AnyObject {
    if (this.$refs.uiTab && Array.isArray(this.$refs.uiTab)) {
      const activeTabRef: HTMLElement = this.$refs.uiTab[this.activeTabIndex] as HTMLElement
      return {
        windowScreenWidth: this.windowScreenWidth,
        index: this.activeTabIndex,
        left: activeTabRef.offsetLeft,
        width: activeTabRef.clientWidth
      }
    } else {
      return {
        windowScreenWidth: this.windowScreenWidth,
        index: this.activeTabIndex,
        left: 0,
        width: 0
      }
    }
  }

  @Watch('activeTabId', { immediate: true })
  onActiveTabIdChanged(newValue: string, oldValue: string | undefined) {
    if (newValue) {
      const activeTabIndex = this.tabs.findIndex(tab => (tab as UiTab).id === newValue)
      this.$nextTick(() => {
        this.activeTabIndex = activeTabIndex !== -1 ? activeTabIndex : 0

        const tabsRef = this.$refs.uiTab as Array<any>
        if (tabsRef) {
          const activeTabRef: HTMLElement = tabsRef[this.activeTabIndex] as HTMLElement
          const gapOffset = 12
          this.scrollOnList = activeTabRef.offsetLeft + activeTabRef.offsetWidth + gapOffset
        }
      })
    }
  }

  @Watch('tabs', { immediate: true })
  onTabsChanged (newValue: Array<UiTab>) {
    if (newValue) {
      if (newValue.length && !this.activeTabId) {
        this.activeTabIndex = 0
      }
    }
  }

  handleTabClick (tab: string) {
    this.$emit('on-tab-clicked', tab)
  }

  mounted () {
  }

  destroyed () {
  }
}
</script>
