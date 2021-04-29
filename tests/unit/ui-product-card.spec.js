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
  })
})
