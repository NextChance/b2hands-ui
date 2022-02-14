import { action } from '@storybook/addon-actions'
import UiCarouselV2 from '~/componentsV2/ui-carousel-v2/component.v2.vue'

import {
  itemsMock2,
  itemsMockOneImageVertical,
  itemsMockOneHorizontal,
  ItemsMockOne,
  itemsMockErr
} from '~/fixtures/ui-carousel.fixture.js'


export default {
  title: 'UI-carousel2',
  component: UiCarouselV2
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const carouselWithSeveralImages = () => ({
  components: { UiCarouselV2 },
  data() {
    return {
      extraContent: '50%',
      items: itemsMock2
    }
  },
  template: `
    <div class="story-ui-carousel-container-2">
      <ui-carouselV2 :items="items" />
    </div>`,
  methods: { }
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const carouselWithOne = () => ({
  components: { UiCarouselV2 },
  data() {
    return {
      items: ItemsMockOne
    }
  },
  template: `
    <div class="story-ui-carousel-container-2">
      <ui-carouselV2 :items="items" />
    </div>`,
  methods: { }
})


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const carouselWithOneImageVertical = () => ({
  components: { UiCarouselV2 },
  data() {
    return {
      items: itemsMockOneImageVertical
    }
  },
  template: `
    <div class="story-ui-carousel-container-2">
      <ui-carouselV2 :items="items" />
    </div>`,
  methods: { }
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const carouselWithOneImageHorizontal = () => ({
  components: { UiCarouselV2 },
  data() {
    return {
      items: itemsMockOneHorizontal
    }
  },
  template: `
    <div class="story-ui-carousel-container-2">
      <ui-carouselV2 :items="items" />
    </div>`,
  methods: { }
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const carouselWithOneImageError = () => ({
  components: { UiCarouselV2 },
  data() {
    return {
      items: itemsMockErr
    }
  },
  template: `
    <div class="story-ui-carousel-container-2">
      <ui-carouselV2 :items="items" />
    </div>`,
  methods: { }
})

