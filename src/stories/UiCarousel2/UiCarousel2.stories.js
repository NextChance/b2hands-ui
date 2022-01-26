import { action } from '@storybook/addon-actions'
import UiCarouselV2 from '~/componentsV2/ui-carousel-v2/component.v2.vue'

import {
  itemsMock2,
  itemsMockErr,
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
export const carouselWithOneImage = () => ({
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
