<template>
  <div
    :class="['ui-tabs', {'ui-tabs--scrollable': hasScroll}]"
  >
    <ul class="ui-tabs__list">
      <li
        v-for="(tab, idx) in tabs"
        :key="`ui-tab--${idx}`"
        :class="['ui-tabs__element', {'ui-tabs__element--active': idx === activeTabIndex}]"
        ref="uiTab"
        @click="handleTabClick(tab)"
      >{{tab}}</li>
    </ul>
    <div
      class="ui-tabs__marker"
      :style="{ transform: `translateX(${markerProperties.left}px) scaleX(${markerProperties.width})`}"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AnyObject from '../types/AnyObject'

export default Vue.extend({
  name: 'ui-tabs',
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: String,
      default: ''
    },
    hasScroll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeTabIndex: -1
    }
  },
  computed: {
    markerProperties (): AnyObject {
      if (this.$refs.uiTab && Array.isArray(this.$refs.uiTab)) {
        const activeTabRef: HTMLElement = this.$refs.uiTab[this.activeTabIndex] as HTMLElement
        return {
          index: this.activeTabIndex,
          left: activeTabRef.offsetLeft,
          width: activeTabRef.clientWidth
        }
      } else {
        return {
          index: this.activeTabIndex,
          left: 0,
          width: 0
        }
      }
    }
  },
  watch: {
    activeTab: {
      immediate: true,
      handler (newValue) {
        if (newValue) {
          const activeTabIndex = this.tabs.findIndex(tab => tab === newValue)
          this.$nextTick(() => {
            this.activeTabIndex = activeTabIndex !== -1 ? activeTabIndex : 0
          })
        }
      }
    },
    tabs: {
      immediate: true,
      handler (newValue) {
        if (newValue.length && !this.activeTab) {
          this.activeTabIndex = 0
        }
      }
    }
  },
  methods: {
    handleTabClick(tab: string) {
      this.$emit('on-tab-clicked', tab)
    }
  }
})
</script>

<style scoped lang="scss">
.ui-tabs {
  $uiTabs: &;

  position: relative;

  *::-webkit-scrollbar {
    width: 0px;
    display: none;
    background: transparent; /* make scrollbar transparent */
  }

  &--scrollable {
    -webkit-transform: translateZ(0); // iOS hack. Don't remove
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
    &::-webkit-scrollbar {
      height: 0px;
      background: transparent; /* Chrome/Safari/Webkit */
    }


    #{$uiTabs}__list {
      width: unset;
    }

    #{$uiTabs}__element {
      flex-shrink: 0;
    }
  }

  &__list {
    display: flex;
    width: 100%;
  }

  &__element {
    border-bottom: 1px solid $black-20;
    color: $black-60;
    cursor: pointer;
    flex-grow: 1;
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
}
</style>
