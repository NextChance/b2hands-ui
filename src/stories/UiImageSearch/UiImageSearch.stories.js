import UiImageSearch from '~/components/ui-image-search'
import { action } from '@storybook/addon-actions'

import { ImageWithBoundsUnselected, ImageWithBoundsPreselected, ImageWithoutBounds } from '~/fixtures/ui-image-search.fixture'

export default {
  title: 'UI-Image-Search',
  component: UiImageSearch
}

export const imageWithBoundsButNotSelected = () => ({
  components: {
    UiImageSearch
  },
  data() {
    return {
      ...ImageWithBoundsUnselected
    }
  },
  template: `
    <div class="story-ui-image-search">
      <ui-image-search
        :image="image"
        :bounds="bounds"
        :activeProductReference="activeProductReference"
        @on-select-bound="onSelectBound"
      ></ui-image-search>
    </div>
  `,
  methods: {
    onSelectBound(newBound) {
      action(`Bound selected:`)(JSON.stringify(newBound))
      this.activeProductReference = newBound.product_search_reference
    }
  }
})

export const imageWithABoundPreSelected = () => ({
  components: {
    UiImageSearch
  },
  data() {
    return {
      ...ImageWithBoundsPreselected
    }
  },
  template: `
    <div class="story-ui-image-search">
      <ui-image-search
        :image="image"
        :bounds="bounds"
        :activeProductReference="activeProductReference"
        @on-select-bound="onSelectBound"
      ></ui-image-search>
    </div>
  `,
  methods: {
    onSelectBound(newBound) {
      action(`Bound selected:`)(JSON.stringify(newBound))
      this.activeProductReference = newBound.product_search_reference
    }
  }
})

export const imageWithoutBounds = () => ({
  components: {
    UiImageSearch
  },
  data() {
    return {
      ...ImageWithoutBounds
    }
  },
  template: `
    <div class="story-ui-image-search">
      <ui-image-search
        :image="image"
        :bounds="bounds"
        :activeProductReference="activeProductReference"
        @on-select-bound="onSelectBound"
      ></ui-image-search>
    </div>
  `,
  methods: {
    onSelectBound(newBound) {
      action(`Bound selected:`)(JSON.stringify(newBound))
      this.activeProductReference = newBound.product_search_reference
    }
  }
})
