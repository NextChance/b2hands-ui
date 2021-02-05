import { action } from '@storybook/addon-actions'
import UiCarousel from '~/components/ui-carousel'


const itemsMock = [
  {
    src:
      'https://previews.123rf.com/images/andreaobzerova/andreaobzerova1405/andreaobzerova140500048/28447933-imagen-vertical-del-color-de-ramas-de-%C3%A1rboles-de-cerezo-en-flor-procesamiento-posterior-suave-de-la-ve.jpg',
    alt: 'image2'
  },
  {
    src:
      'https://s1.eestatic.com/2020/06/23/curiosidades/naturaleza-planeta-tierra/ciencias_naturales-flores-tierra_-planeta_499960581_154305912_1706x960.jpg',
    alt: 'image1'
  },
  {
    src:
      'https://image.freepik.com/foto-gratis/banner-vista-panoramica-hermosas-flores-rosas-floreciendo_100787-2367.jpg',
    alt: 'image3'
  },
  {
    src:
      'https://www.jardineriaon.com/wp-content/uploads/2018/04/flores-decorativas-y-vistosas.jpg.webp',
    alt: 'image4'
  }
]

const itemsMockOneImage = [
  {
    src:
      'https://www.jardineriaon.com/wp-content/uploads/2018/04/flores-decorativas-y-vistosas.jpg.webp',
    alt: 'image4'
  }
]

const itemsMockOneImageVertical = [
  {
    src:
      'https://previews.123rf.com/images/andreaobzerova/andreaobzerova1405/andreaobzerova140500048/28447933-imagen-vertical-del-color-de-ramas-de-%C3%A1rboles-de-cerezo-en-flor-procesamiento-posterior-suave-de-la-ve.jpg',
    alt: 'image4'
  }
]

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
