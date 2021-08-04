<template>
  <UiScrollableList
    :class="['ui-tabs', {'ui-tabs--scrollable': hasScroll}]"
    :has-scroll="hasScroll"
    :forced-scroll="scrollOnList"
  >
    <ul class="ui-tabs__list">
      <li
        v-for="(tab, idx) in tabs"
        :key="`ui-tab--${idx}`"
        :class="['ui-tabs__element', {'ui-tabs__element--active': idx === activeTabIndex}]"
        ref="uiTab"
        @click="handleTabClick(tab)"
      >{{tab.value}}</li>
    </ul>
    <div
      class="ui-tabs__marker"
      :style="{ transform: `translateX(${markerProperties.left}px) scaleX(${markerProperties.width})`}"
    ></div>
  </UiScrollableList>
</template>

<script lang="ts">
import AnyObject from '../types/AnyObject'
import { UiTab } from '../types/Components'
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

<style scoped lang="scss">
.ui-tabs {
  $uiTabs: &;

  border-bottom: 1px solid $black-20;
  position: relative;

  *::-webkit-scrollbar {
    -webkit-appearance: none;
    background: transparent; /* make scrollbar transparent */
    display: none;
    height: 0px;
    width: 0px;
  }

  &--scrollable {
    #{$uiTabs}__list {
      width: unset;
    }

    #{$uiTabs}__element {
      flex-shrink: 0;
      flex-grow: 1;
      white-space: nowrap;
    }
  }

  &__list {
    display: flex;
    width: 100%;
  }

  &__element {
    @include body('s');
    color: $black-60;
    cursor: pointer;
    padding: $spacing-size-3 $spacing-size-4;
    text-align: center;
    transition: color .2s ease-in;

    &--active {
      color: $black-100
    }
  }

  &__marker {
    background-color: $black-100;
    bottom: 0;
    height: 1px;
    left: 0;
    position: absolute;
    transform-origin: left;
    transition: transform .2s ease-in;
    width: 1px;
  }

  &__button {
    background-color: transparent;
    bottom: 0;
    color: $black-60;
    font-size: $font-size-2;
    height: $font-size-2 + 2 * $spacing-size-1;
    margin: auto 0;
    padding: $spacing-size-1;
    position: absolute;
    top: 0;
  }

  @media (min-width: $breakpoint-s) {
    &__scroll-helper {
      display: block;
    }
  }
}
</style>
