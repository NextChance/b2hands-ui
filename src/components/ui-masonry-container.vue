<template>
  <ul
    ref="masonryContainer"
    class="masonry">
    <li
      v-for="(image, idx) in images"
      :key="`masonry-image${idx}`"
      ref="masonryElement"
      class="masonry__item">
      <ui-lazy-invent
        class="ui-carousel__thumbnails__image"
        :alt="`${image.alt}`"
        :src="image.src"
        sizes="5.6vw"
        @on-image-loaded="onImageLoaded(idx)"
      ></ui-lazy-invent>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import UiLazyInvent from './ui-lazy-invent.vue'

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
      const rowSpan = Math.floor((item.children[0].getBoundingClientRect().height + this.itemGap) / (this.rowHeight))
      item.style.gridRowEnd = 'span ' + rowSpan
    },
    resizeAllGridItems (): void {
      this.debounceTimer = setTimeout(() => {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer)
        }
        this._resizeAllGridItems()
      }, 1000)
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
    onImageLoaded (index: number) {
      const masonryElements = this.$refs.masonryElement as [HTMLElement]
      this.resizeGridItem(masonryElements[index])
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

<style lang="scss" scoped>
$itemGap: 10px;

.masonry {
  display: grid;
  grid-gap: 0 $itemGap;
  grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  grid-auto-rows: 10px;

  &__item {
    margin-bottom: $itemGap;
    position: relative;
    overflow: hidden;
  }
}
</style>
