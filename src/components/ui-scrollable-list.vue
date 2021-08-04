<template>
  <div class="ui-scrollable-list__container">
    <div
      ref="tabContainer"
      :class="['ui-scrollable-list', {'ui-scrollable-list--scrollable': hasScroll}]"
    >
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        v-if="hasScroll && !isMinScroll"
        class="ui-scrollable-list__scroll-helper ui-scrollable-list__scroll-helper--prev">
        <button
          class="ui-scrollable-list__button"
          @click="moveScrollLeft"
        ><i class="b2i-left"></i></button>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="hasScroll && !isMaxScroll"
        class="ui-scrollable-list__scroll-helper ui-scrollable-list__scroll-helper--next">
        <button
          class="ui-scrollable-list__button"
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
export default class UiScrollableList extends Vue {
  container: HTMLElement | null = null
  isMinScroll: boolean = false
  isMaxScroll: boolean = false
  hasSlideNavigation: boolean = false

  @Prop({ default: 0 }) forcedScroll!: number
  @Prop({ default: false }) hasScroll!: boolean

  @Watch('forcedScroll', { immediate: true })
  onForcedScrollChanged (newValue: number = 0, oldValue: number) {
    if (this.container) {
      // @ts-ignore: Object is possibly 'null'.
      this.container.style.scrollBehavior = oldValue ? 'smooth' : 'unset'
      // @ts-ignore: Object is possibly 'null'.
      this.container.scrollLeft = newValue - this.container.offsetWidth
      setTimeout(() => {
        // @ts-ignore: Object is possibly 'null'.
        this.container.style.scrollBehavior = 'smooth'
      }, 100)
    }
  }

  onWindowResize (): void {
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
.ui-scrollable-list {
  $uiScrollableList: &;

  &__container {
    position: relative;
  }
  &--scrollable {
    -webkit-transform: translateZ(0); // iOS hack. Don't remove
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */

    &::-webkit-scrollbar {
      -webkit-appearance: none;
      background: transparent; /* Chrome/Safari/Webkit */
      display: none;
      height: 0px;
      width: 0;
    }
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

      #{$uiScrollableList}__button {
        left: 0;
      }
    }

    &--next {
      background: linear-gradient(270deg, #FFFFFF 47.92%, rgba(255, 255, 255, 0) 100%);
      right: 0;

      #{$uiScrollableList}__button {
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
