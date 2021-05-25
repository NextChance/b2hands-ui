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
        :alt="`${image.title}`"
        :src="image.url"
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
$itemGap: 8px;

.masonry {
  display: grid;
  grid-gap: 0 $itemGap;
  //grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 20px;

  &__item {
    margin-bottom: $itemGap;
    position: relative;
    overflow: hidden;
    grid-row-end: span 11;

    /deep/ .placeholder-image {
      height: unset;
    }
  }

  @media (min-width: $breakpoint-s) {
    $itemGap: 16px;

    grid-gap: 0 $itemGap;
    grid-template-columns: 1fr 1fr 1fr;

    &__item {
      margin-bottom: $itemGap;
      grid-row-end: span 10;
    }
  }

  @media (min-width: $breakpoint-m) {
    grid-template-columns: 1fr 1fr 1fr 1fr;

    &__item {
      grid-row-end: span 7;
    }
  }

  @media (min-width: $breakpoint-l) {
    &__item {
      grid-row-end: span 9;
    }
  }
}
</style>
