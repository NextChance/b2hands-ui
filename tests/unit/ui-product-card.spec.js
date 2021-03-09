/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import UiProductCard from '@/src/components/ui-product-card.vue'
import { productsMocks } from '@/src/fixtures/ui-product-card.fixture'
describe('UiProductCard', () => {
  const componentConfig = {
    propsData: {
      product: productsMocks[0]
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
    const event = { preventDefault: jest.fn() }
    describe('handleEyeIcon', () => {
      beforeEach(() => {
        wrapper = shallowMount(UiProductCard, componentConfig)
        jest.spyOn(event, 'preventDefault')
        wrapper.vm.handleEyeIcon(event)
      })
      it('should emit the event on-click-eye-icon', () => {
        expect(wrapper.emitted('on-click-eye-icon')).toBeTruthy()
      })
    })
  })
})
