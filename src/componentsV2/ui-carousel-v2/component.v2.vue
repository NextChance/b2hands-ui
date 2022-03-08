<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
import UiLazyInvent from '../ui-lazy-invent/component.v2.vue'
import Image from '@/external/types/Image'

interface CarouselSizing {
  containerWidth: number
  maxTranslation: number
  hasSlideNavigation: boolean
}

export default Vue.extend({
  name: 'UiCarousel2',
  components: {
    UiLazyInvent
  },
  props: {
    items: {
      type: Array,
      default: (): Array<Image> => []
    }
  },
  data() {
    return {
      isFirstImageLoaded: false,
      isAnyImageLoaded: false,
      maxTranslation: 0,
      isMaxScroll: false,
      isMinScroll: false,
      hasSlideNavigation: false,
      debounceTimer: setTimeout(() => {})
    } as {
      isFirstImageLoaded: boolean
      isAnyImageLoaded: boolean
      maxTranslation: number
      isMaxScroll: boolean
      isMinScroll: boolean
      hasSlideNavigation: boolean,
      debounceTimer: any
    }
  },
  mounted() {
    const carousel = this.$refs.carousel as HTMLElement
    const { maxTranslation, hasSlideNavigation } = this.getCarouselSizing()
    window.addEventListener('resize', this.onWindowResize)
    carousel.addEventListener('scroll', this.setArrowStatus)
    this.setScrollStatus(
      maxTranslation,
      hasSlideNavigation,
      carousel.scrollLeft
    )
  },
  watch: {
    items () {
      this.$nextTick(() => {
        this.setArrowStatus()
      })
    }
  },
  methods: {
    onImageLoaded (index: number): void {
      this.isAnyImageLoaded = true
      if (index === 0) {
        this.isFirstImageLoaded = true
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onImageError(_refIndex: number): void {
      this.isAnyImageLoaded = true
      if (_refIndex === 0) {
        this.isFirstImageLoaded = true
      }
    },

    getCarouselSizing(): CarouselSizing  {
      const carousel = this.$refs.carousel as HTMLElement
      const containerWidth = carousel && carousel.offsetWidth
      const maxTranslation = carousel
        ? carousel.scrollWidth - containerWidth
        : 0
      const hasSlideNavigation = maxTranslation > 0

      return {
        containerWidth,
        maxTranslation,
        hasSlideNavigation
      }
    },

    moveToRight(): void {
      const carousel = this.$refs.carousel as HTMLElement
      let scrollPosition
      const {
        containerWidth,
        maxTranslation
      } = this.getCarouselSizing()
      scrollPosition = carousel.scrollLeft + containerWidth
      scrollPosition =
        scrollPosition > maxTranslation ? maxTranslation : scrollPosition
      carousel.scrollLeft = scrollPosition
    },

    moveToLeft(): void {
      const carousel = this.$refs.carousel as HTMLElement
      let scrollPosition
      const {
        containerWidth
      } = this.getCarouselSizing()
      scrollPosition = carousel.scrollLeft - containerWidth
      scrollPosition = scrollPosition < 0 ? 0 : scrollPosition
      carousel.scrollLeft = scrollPosition
    },

    setScrollStatus(
      maxTranslation: number,
      hasSlideNavigation: boolean,
      scrollPosition: number
    ): void {
      this.hasSlideNavigation = hasSlideNavigation
      this.isMaxScroll = scrollPosition >= maxTranslation
      this.isMinScroll = scrollPosition === 0
    },

    setArrowStatus(): void {
      const carousel = this.$refs.carousel as HTMLElement
      const { maxTranslation, hasSlideNavigation } = this.getCarouselSizing()
      this.setScrollStatus(
        maxTranslation,
        hasSlideNavigation,
        carousel?.scrollLeft || 0
      )
    },

    onWindowResize(): void {
      const carousel = this.$refs.carousel as HTMLElement
      const { maxTranslation, hasSlideNavigation } = this.getCarouselSizing()
      this.setScrollStatus(
        maxTranslation,
        hasSlideNavigation,
        carousel?.scrollLeft || 0
      )
    }
  }
})
</script>
