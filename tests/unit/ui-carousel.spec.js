/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import UiCarousel from '@/src/components/ui-carousel.vue'
import { itemsMock } from '@/src/fixtures/ui-carousel.fixture'

const componentConfig = {
  propsData: { items: itemsMock }
}
describe('UiCarousel.vue', () => {
  let wrapper
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallowMount(UiCarousel, componentConfig)
    })
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('Methods', () => {
    const event = { preventDefault: () => {} }
    describe('handleEyeIcon', () => {
      beforeEach(() => {
        wrapper = shallowMount(UiCarousel, componentConfig)
        jest.spyOn(event, 'preventDefault')
        wrapper.vm.handleEyeIcon(event)
      })
      it('should emit the event bon-click-eye-icon', () => {
        expect(wrapper.emitted('on-click-eye-icon')).toBeTruthy()
      })
    })
  })
})
