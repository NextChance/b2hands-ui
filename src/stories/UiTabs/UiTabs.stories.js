import UiTabs from '~/components/ui-tabs'
import { action } from '@storybook/addon-actions'
import { scrollableTabs, staticTabs, tabsWithActiveSet } from '@/fixtures/ui-tabs.fixture'

export default {
  title: 'UI-Tabs',
  component: UiTabs
}

export const uiTabsScrollable = () => ({
  components: { UiTabs },
  data() {
    return scrollableTabs
  },
  template: `
    <div class="story-ui-tabs-container story-ui-tabs-container--scrollable">
      <ui-tabs
        :tabs="tabs"
        :active-tab="activeTab"
        :hasScroll="true"
        @on-tab-clicked="onTabClick"
      />
    </div>`,
  methods: {
    onTabClick(tab) {
      this.activeTab = tab
      this.proxy(tab)
    },
    proxy: action('Clicked tab')
  }
})

export const uiTabsStatic = () => ({
  components: { UiTabs },
  data() {
    return staticTabs
  },
  template: `
    <div class="story-ui-tabs-container story-ui-tabs-container--scrollable">
      <ui-tabs
        :tabs="tabs"
        :active-tab="activeTab"
        @on-tab-clicked="onTabClick"
      />
    </div>`,
  methods: {
    onTabClick(tab) {
      this.activeTab = tab
      this.proxy(tab)
    },
    proxy: action('Clicked tab')
  }
})

export const uiTabsActiveTab = () => ({
  components: { UiTabs },
  data() {
    return tabsWithActiveSet
  },
  template: `
    <div class="story-ui-tabs-container story-ui-tabs-container--scrollable">
      <ui-tabs
        :tabs="tabs"
        :active-tab="activeTab"
        @on-tab-clicked="onTabClick"
      />
    </div>`,
  methods: {
    onTabClick(tab) {
      this.activeTab = tab
      this.proxy(tab)
    },
    proxy: action('Clicked tab')
  }
})
