import { action } from '@storybook/addon-actions'
import UiCarousel from '~/components/ui-carousel'

import {
  itemsMock,
  itemsMockOneImage,
  itemsMockOneImageVertical
} from '~/fixtures/ui-carousel.fixture.js'


export default {
  title: 'UI-carousel',
  component: UiCarousel
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const carouselWithSeveralImages = () => ({
  components: { UiCarousel },
  data() {
    return {
      extraContent: '50%',
      items: itemsMock
    }
  },
  template: `
    <div class="col-container">
      <div class="col-6--s">
        <ui-carousel :items="items" :extra-content="extraContent" @on-click-eye-icon="onClickIcon"/>
      </div>
    </div>`,
  methods: { onClickIcon: action('go to image search') }
})

export const carouselWithOneImageHorizontal = () => ({
  components: { UiCarousel },
  data() {
    return {
      extraContent: '50%',
      items: itemsMockOneImage
    }
  },
  template: `
    <div class="col-container">
      <div class="col-6--s">
        <ui-carousel :items="items" :extra-content="extraContent"/>
      </div>
    </div>`,
   methods: { onClickIcon: action('go to image search') }
})

export const carouselWithOneImageVertical = () => ({
  components: { UiCarousel },
  data() {
    return {
      extraContent: '50%',
      items: itemsMockOneImageVertical
    }
  },
  template: `
    <div class="col-container">
      <div class="col-6--s">
        <ui-carousel :items="items" :extra-content="extraContent"/>
      </div>
    </div>`,
  methods: { onClickIcon: action('go to image search') }
})
