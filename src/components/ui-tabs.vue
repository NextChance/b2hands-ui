<template>
  <div class="ui-tabs__container">
    <div
      ref="tabContainer"
      :class="['ui-tabs', {'ui-tabs--scrollable': hasScroll}]"
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
    </div>
    <transition name="fade">
      <div
        v-if="hasScroll && !isMinScroll"
        class="ui-tabs__scroll-helper ui-tabs__scroll-helper--prev">
        <button
          class="ui-tabs__button"
          @click="moveScrollLeft"
        ><i class="b2i-left"></i></button>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="hasScroll && !isMaxScroll"
        class="ui-tabs__scroll-helper ui-tabs__scroll-helper--next">
        <button
          class="ui-tabs__button"
          @click="moveScrollRight"
        ><i class="b2i-right"></i></button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import AnyObject from '../types/AnyObject'
import { UiTab } from '../types/Components'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class UiTabs extends Vue {
  container: HTMLElement | null = null
  activeTabIndex: number = -1
  windowScreenWidth: number = 0
  isMinScroll: boolean = false
  isMaxScroll: boolean = false
  hasSlideNavigation: boolean = false

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
  onActiveTabIdChanged(newValue: string) {
    if (newValue) {
      const activeTabIndex = this.tabs.findIndex(tab => (tab as UiTab).id === newValue)
      this.$nextTick(() => {
        this.activeTabIndex = activeTabIndex !== -1 ? activeTabIndex : 0
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

  onWindowResize (): void {
    this.windowScreenWidth = window.innerWidth
    const { maxTranslation, hasSlideNavigation } = this.getCarouselSizing()
    this.setScrollStatus(
      maxTranslation,
      hasSlideNavigation,
      this.container?.scrollLeft || 0
    )
  }

  getCarouselSizing () {
    const containerWidth = this.container && this.container.offsetWidth || 0
    const maxTranslation = this.container
      ? this.container.scrollWidth - containerWidth
      : 0
    const hasSlideNavigation = maxTranslation > 0

    return {
      containerWidth,
      maxTranslation,
      hasSlideNavigation
    }
  }

  setArrowStatus() {
    const { maxTranslation, hasSlideNavigation } = this.getCarouselSizing()
    this.setScrollStatus(
      maxTranslation,
      hasSlideNavigation,
      this.container?.scrollLeft || 0
    )
  }

  setScrollStatus(maxTranslation: number, hasSlideNavigation: boolean, scrollPosition: number) {
    this.hasSlideNavigation = hasSlideNavigation
    this.isMaxScroll = scrollPosition === maxTranslation
    this.isMinScroll = scrollPosition === 0
  }

  moveScrollRight() {
    let scrollPosition
    const {
      containerWidth,
      maxTranslation,
      hasSlideNavigation
    } = this.getCarouselSizing()
    scrollPosition = (this.container?.scrollLeft || 0) + containerWidth
    scrollPosition =
      scrollPosition > maxTranslation ? maxTranslation : scrollPosition
    if (this.container) {
      this.container.scrollLeft = scrollPosition
    }
    this.setScrollStatus(maxTranslation, hasSlideNavigation, scrollPosition)
  }

  moveScrollLeft() {
    let scrollPosition
    const {
      containerWidth,
      maxTranslation,
      hasSlideNavigation
    } = this.getCarouselSizing()
    scrollPosition = (this.container?.scrollLeft || 0) - containerWidth
    scrollPosition = scrollPosition < 0 ? 0 : scrollPosition
    if (this.container) {
      this.container.scrollLeft = scrollPosition
    }
    this.setScrollStatus(maxTranslation, hasSlideNavigation, scrollPosition)
  }

  mounted () {
    this.container = (this.$refs.tabContainer as HTMLElement)
    const { maxTranslation, hasSlideNavigation } = this.getCarouselSizing()
    // @ts-ignore
    window.addEventListener('resize', this.onWindowResize)
    this.container.addEventListener('scroll', this.setArrowStatus)
    this.setScrollStatus(
      maxTranslation,
      hasSlideNavigation,
      this.container.scrollLeft || 0
    )
  }

  destroyed () {
    // @ts-ignore
    window.removeEventListener('resize', this.onWindowResize)
    if (this.container) {
      this.container.removeEventListener('scroll', this.setArrowStatus)
    }
  }
}
</script>

<style scoped lang="scss">
.ui-tabs {
  $uiTabs: &;

  &__container {
    border-bottom: 1px solid $black-20;
    position: relative;
  }

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
      flex-grow: 1;
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

  &__scroll-helper {
    display: none;
    position: absolute;
    bottom: 0;
    top: 0;
    width: $spacing-size-12;

    &--prev {
      background: linear-gradient(90deg, #FFFFFF 47.92%, rgba(255, 255, 255, 0) 100%);
      left: 0;

      #{$uiTabs}__button {
        left: 0;
      }
    }

    &--next {
      background: linear-gradient(270deg, #FFFFFF 47.92%, rgba(255, 255, 255, 0) 100%);
      right: 0;

      #{$uiTabs}__button {
        right: 0;
      }
    }
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

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}
</style>
