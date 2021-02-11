/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import UiProductCard from '@/src/components/ui-product-card.vue'
import { productsMocks } from '@/src/fixtures/ui-product-card.fixture'
describe('UiProductCard', () => {
  const componentConfig = {
    propsData: {
      src: productsMocks[0].src,
      alt: productsMocks[0].alt,
      url: productsMocks[0].url,
      labelText: productsMocks[0].labelText,
      title: productsMocks[0].title,
      brand: productsMocks[0].brand,
      merchant: productsMocks[0].merchant,
      finalPrice: productsMocks[0].finalPrice,
      fullPrice: productsMocks[0].fullPrice,
      id: productsMocks[0].id
    }
  }
  describe('rendering', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(UiProductCard, componentConfig)
    })
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('Methods', () => {
    let wrapper
    const event = { preventDefault: () => {} }
    describe('handleEyeIcon', () => {
      beforeEach(() => {
        wrapper = shallowMount(UiProductCard, componentConfig)
        jest.spyOn(event, 'preventDefault')
        wrapper.find('a.nav-actions__icons').trigger('click')
      })
      it('should emit the event on-click-eye-icon', () => {
        debugger
        expect(wrapper.emitted('on-click-eye-icon')).toBeTruthy()
        expect(wrapper.emitted()['on-click-eye-icon'][0]).toEqual([
          productsMocks[0].id
        ])
      })
    })
  })
})
