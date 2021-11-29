<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue3'
import AnyObject from '@/types/AnyObject'
import { replaceNodeWithErrorImage } from '@/tools/errorImage'

export default defineComponent({
  name: 'UiScrollableList',
  props: {
    forcedScroll: {
      type: Number,
      default: 0
    },
    hasScroll: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const tabContainer = ref(null)
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
      container = (tabContainer as HTMLElement)
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
      window.removeEventListener('resize', this.onWindowResize)
      if (container) {
        container.removeEventListener('scroll', setArrowStatus)
      }
    })

    return { isMinScroll, isMaxScroll, moveScrollLeft, moveScrollRight }
  }
})
</script>
