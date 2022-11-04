<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
import UiLazyInvent from '../ui-lazy-invent/component.v2.vue'
import type { DiscoveryImage } from '@/external/types/Image'

export default Vue.extend({
  data () {
    return {
      itemGap: 10,
      debounceTimer: setTimeout(() => {}, 0),
      grid: null,
      rowHeight: 0
    } as {
      itemGap: number,
      debounceTimer: ReturnType<typeof setTimeout>,
      grid: HTMLElement | null,
      rowHeight: number
    }
  },
  components: {
    UiLazyInvent
  },
  props: {
    images: {
      type: Array,
      default: []
    }
  },
  methods: {
    resizeGridItem (item: HTMLElement): void {
      // const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))
      const itemHeight = item.children[0].getBoundingClientRect().height
      if (itemHeight) {
        const rowSpan = Math.floor((itemHeight + this.itemGap) / (this.rowHeight))
        item.style.gridRowEnd = 'span ' + rowSpan
      }
    },

    resizeAllGridItems (): void {
      this.debounceTimer = setTimeout(() => {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer)
        }
        this._resizeAllGridItems()
      }, 0)
    },

    _resizeAllGridItems () {
      if (this.grid) {
        this.rowHeight = parseInt(window.getComputedStyle(this.grid).getPropertyValue('grid-auto-rows'))
      }
      const masonryElements = this.$refs.masonryElement as [HTMLElement]
      masonryElements.forEach((masonryElement: HTMLElement) => {
        this.resizeGridItem(masonryElement)
      })
    },

    onImageLoaded (image: HTMLImageElement,index: number) {
      const masonryElements = this.$refs.masonryElement as [HTMLElement]
      this.$emit('onImageLoaded', { image, index })
      this.resizeGridItem(masonryElements[index])
    },

    onItemClicked (item: DiscoveryImage) {
      this.$emit('onItemClicked', item)
    }
  },

  mounted () {
    this.grid = this.$refs.masonryContainer as HTMLElement
    if (this.grid) {
      this.rowHeight = parseInt(window.getComputedStyle(this.grid).getPropertyValue('grid-auto-rows'))
    }
    this.resizeAllGridItems()
    window.addEventListener('resize', this.resizeAllGridItems)
  },

  destroyed () {
    window.removeEventListener('resize', this.resizeAllGridItems)
  }
})
</script>
