/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import UiCarousel from '@/src/components/ui-carousel.vue'
import { itemsMock } from '@/src/fixtures/ui-carousel.fixture'
import { replaceNodeWithErrorImage } from '@/src/tools/errorImage'
jest.mock('@/src/tools/errorImage', () => {
  return {
    replaceNodeWithErrorImage: jest.fn()
  }
})

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
    const event = { preventDefault: jest.fn() }
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
    describe('onImageError()', () => {
      const mockReffName = 0
      const mockAddClass = jest.fn()
      beforeEach(() => {
        wrapper = shallowMount(UiCarousel, componentConfig)
        wrapper.vm.$refs['image-actions']= [
          {
            classList: {
              add: mockAddClass
            }
          }
        ]
        wrapper.vm.onImageError(mockReffName)
      })
      it('should set error class', () => {
        expect(mockAddClass).toHaveBeenCalledWith('nav-actions--error')
      })
    })
  })
})
