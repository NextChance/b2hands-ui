<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue3'
import type AnyObject from '@/external/types/AnyObject'

const props = defineProps({
  forcedScroll: {
    type: Number,
    default: 0
  },
  hasScroll: {
    type: Boolean,
    default: false
  },
  hideHelpers: {
    type: Boolean,
    default: false
  }
})

const tabContainer = ref<HTMLElement | null>(null)
let container: HTMLElement | null | any = null
let isMinScroll = false
let isMaxScroll = false
let hasSlideNavigation = false

const onForcedScrollChanged = (newValue = 0, oldValue: number): void => {
  if (container) {
    // @ts-ignore: Object is possibly 'null'.
    container.style.scrollBehavior = oldValue ? 'smooth' : 'unset'
    // @ts-ignore: Object is possibly 'null'.
    container.scrollLeft = newValue - container.offsetWidth
    setTimeout(() => {
      // @ts-ignore: Object is possibly 'null'.
      container.style.scrollBehavior = 'smooth'
    }, 100)
  }
}

watch(() => props.forcedScroll, (newValue:number, oldValue: number) => {
  onForcedScrollChanged(newValue,oldValue)
})

const getCarouselSizing = (): AnyObject => {
  const containerWidth = (container && container.offsetWidth) || 0
  const maxTranslation = container
    ? container.scrollWidth - containerWidth
    : 0

  const hasSlideNavigation = maxTranslation > 0

  return {
    containerWidth,
    maxTranslation,
    hasSlideNavigation
  }
}

const setScrollStatus = (maxTranslation: number, _hasSlideNavigation: boolean, scrollPosition: number): void => {
  hasSlideNavigation = _hasSlideNavigation
  isMaxScroll = scrollPosition === maxTranslation
  isMinScroll = scrollPosition === 0
}

const onWindowResize = (): void => {
  const { maxTranslation, hasSlideNavigation } = getCarouselSizing()
  setScrollStatus(
    maxTranslation,
    hasSlideNavigation,
    container?.scrollLeft || 0
  )
}

const setArrowStatus = (): void => {
  const { maxTranslation, hasSlideNavigation } = getCarouselSizing()
  setScrollStatus(
    maxTranslation,
    hasSlideNavigation,
    container?.scrollLeft || 0
  )
}

const moveScrollRight = (): void => {
  let scrollPosition
  const { containerWidth, maxTranslation, hasSlideNavigation } =
    getCarouselSizing()
  scrollPosition = (container?.scrollLeft || 0) + containerWidth
  scrollPosition =
    scrollPosition > maxTranslation ? maxTranslation : scrollPosition
  if (container) {
    container.scrollLeft = scrollPosition
  }
  setScrollStatus(maxTranslation, hasSlideNavigation, scrollPosition)
}

const moveScrollLeft = (): void => {
  let scrollPosition
  const { containerWidth, maxTranslation, hasSlideNavigation } =
    getCarouselSizing()
  scrollPosition = (container?.scrollLeft || 0) - containerWidth
  scrollPosition = scrollPosition < 0 ? 0 : scrollPosition
  if (container) {
    container.scrollLeft = scrollPosition
  }
  setScrollStatus(maxTranslation, hasSlideNavigation, scrollPosition)
}

onMounted(() => {
  container = (tabContainer.value as HTMLElement)
  const { maxTranslation, hasSlideNavigation } = getCarouselSizing()
  // @ts-ignore
  window.addEventListener('resize', onWindowResize)
  container.addEventListener('scroll', setArrowStatus)
  setScrollStatus(
    maxTranslation,
    hasSlideNavigation,
    container.scrollLeft || 0
  )
})

onUnmounted(() => {
  // @ts-ignore
  window.removeEventListener('resize', onWindowResize)
  if (container) {
    container.removeEventListener('scroll', setArrowStatus)
  }
})

</script>
