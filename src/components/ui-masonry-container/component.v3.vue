<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue3'
import UiLazyInvent from '../ui-lazy-invent/component.v3.vue'
import type { DiscoveryImage } from '@/external/types/Image'

export default defineComponent({
  name: 'UiMasonryContainer',
  components: {
    'Ui-lazy-invent': UiLazyInvent
  },
  props: {
    images: {
      type: Array,
      default: []
    }
  },
  setup (props, { emit }) {
    const itemGap = ref(10)
    const debounceTimer = ref(setTimeout(() => {}, 0))
    const grid = ref<HTMLElement | null>(null)
    const rowHeight = ref(0)
    const masonryContainer = ref<HTMLElement | null>(null)
    const masonryElement = ref<Array<HTMLElement> | null>(null)

    const resizeGridItem = (item: HTMLElement): void => {
      // const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))
      const itemHeight = item.children[0].getBoundingClientRect().height
      if (itemHeight) {
        const rowSpan = Math.floor((itemHeight + itemGap.value) / (rowHeight.value))
        item.style.gridRowEnd = 'span ' + rowSpan
      }
    }

    const resizeAllGridItems = (): void => {
      debounceTimer.value = setTimeout(() => {
        if (debounceTimer.value) {
          clearTimeout(debounceTimer.value)
        }
        _resizeAllGridItems()
      }, 0)
    }

    const _resizeAllGridItems = () => {
      if (grid.value) {
        rowHeight.value = parseInt(window.getComputedStyle(grid.value).getPropertyValue('grid-auto-rows'))
      }

      (masonryElement.value || []).forEach((masonryElement: HTMLElement) => {
        resizeGridItem(masonryElement)
      })
    }

    const onImageLoaded = (image: HTMLImageElement,index: number) => {
      const masonryElements = masonryElement.value as [HTMLElement]
      emit('onImageLoaded', { image, index })
      resizeGridItem(masonryElements[index])
    }

    const onItemClicked = (item: DiscoveryImage) => {
      emit('onItemClicked', item)
    }

    onMounted(() => {
      grid.value = masonryContainer.value as HTMLElement
      if (grid.value) {
        rowHeight.value = parseInt(window.getComputedStyle(grid.value).getPropertyValue('grid-auto-rows'))
      }
      resizeAllGridItems()
      window.addEventListener('resize', resizeAllGridItems)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resizeAllGridItems)
    })

    return {
      itemGap,
      debounceTimer,
      grid,
      rowHeight,
      resizeGridItem,
      onImageLoaded,
      onItemClicked
    }
  }
})
</script>
