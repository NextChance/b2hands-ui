<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import type AnyObject from '@/external/types/AnyObject'

@Component
export default class UiScrollableList extends Vue {
  container: HTMLElement | null = null
  isMinScroll = false
  isMaxScroll = false
  hasSlideNavigation = false

  @Prop({ default: 0 }) forcedScroll!: number
  @Prop({ default: false }) hasScroll!: boolean

  @Watch('forcedScroll', { immediate: true })
  onForcedScrollChanged (newValue: number = 0, oldValue: number):void {
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

  getCarouselSizing ():AnyObject {
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

  setArrowStatus():void {
    const { maxTranslation, hasSlideNavigation } = this.getCarouselSizing()
    this.setScrollStatus(
      maxTranslation,
      hasSlideNavigation,
      this.container?.scrollLeft || 0
    )
  }

  setScrollStatus(maxTranslation: number, hasSlideNavigation: boolean, scrollPosition: number):void {
    this.hasSlideNavigation = hasSlideNavigation
    this.isMaxScroll = scrollPosition === maxTranslation
    this.isMinScroll = scrollPosition === 0
  }

  moveScrollRight():void {
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

  moveScrollLeft():void {
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

  mounted ():void {
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

  destroyed ():void {
    // @ts-ignore
    window.removeEventListener('resize', this.onWindowResize)
    if (this.container) {
      this.container.removeEventListener('scroll', this.setArrowStatus)
    }
  }
}
</script>
