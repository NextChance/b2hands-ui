<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
import UiLazyInvent from '../ui-lazy-invent.vue'

interface ImgItem {
  src: string
  srcSets: string
  alt: string
}

export default Vue.extend({
  name: 'UiCarousel',
  data() {
    return {
      isFirstImageLoaded: false,
      isAnyImageLoaded: false
    }
  },
  components: {
    UiLazyInvent
  },
  props: {
    items: {
      type: Array,
      default: (): Array<ImgItem> => []
    },
    extraContent: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    errorImage: {
      type: String,
      default: ''
    },
    placeholderImage: {
      type: String,
      default: ''
    }
  },
  methods: {
    onImageLoaded (index: number): void {
      this.isAnyImageLoaded = true
      if( index===0 ) {
        this.isFirstImageLoaded = true
      }
    },

    onImageError (refIndex: number): void {
      const element = (this.$refs['imageActions'] as HTMLElement[])[refIndex]
      if (element) {
        element.classList.add('nav-actions--error')
      }
    },

    getPosition($event: Event, id: string): void {
      $event.preventDefault()
      this.$emit('on-thumbnail', id)
    }
  }
})
</script>
