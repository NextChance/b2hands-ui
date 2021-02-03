import UiCarousel from '~/components/ui-carousel'

const itemsMock = [
  {
    src:
      'https://s1.eestatic.com/2020/06/23/curiosidades/naturaleza-planeta-tierra/ciencias_naturales-flores-tierra_-planeta_499960581_154305912_1706x960.jpg',
    alt: 'image1'
  },
  {
    src:
      'https://s1.eestatic.com/2020/10/26/actualidad/flores-hogar-decoracion_531208717_163606644_1706x960.jpg',
    alt: 'image2'
  },
  {
    src:
      'https://s1.eestatic.com/2020/10/26/actualidad/flores-hogar-decoracion_531208718_163601853_1706x1280.jpg',
    alt: 'image3'
  },
  {
    src: 'error',
    alt: 'image4'
  }
]

export default {
  title: 'UI-carousel',
  component: UiCarousel
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const carousel = () => ({
  components: { UiCarousel },
  data() {
    return {
      extraContent: '50%',
      items: itemsMock
    }
  },
  template:
    '<div class="story-container carousel"><ui-carousel :items="items" :extra-content="extraContent" /></div>'
})
