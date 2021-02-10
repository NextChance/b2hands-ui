import { shallowMount, Wrapper } from '@vue/test-utils'
import UiCarousel from '@/components/ui-carousel.vue'

const items = [
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
const componentConfig = {
  propsData: { items }
}
describe('UiCarousel.vue', () => {
  let wrapper: Wrapper<Vue>
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallowMount(UiCarousel, componentConfig)
    })
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('Methods', () => {
    const event = { preventDefault: (): void => {} }
    describe('handleEyeIcon', () => {
      beforeEach(() => {
        wrapper = shallowMount(UiCarousel, componentConfig)
        jest.spyOn(event, 'preventDefault')
        wrapper.find('a.icon-link').trigger('click')
      })
      it('should emit the event bon-click-eye-icon', () => {
        expect(wrapper.emitted('on-click-eye-icon')).toBeTruthy()
      })
    })
  })
})
