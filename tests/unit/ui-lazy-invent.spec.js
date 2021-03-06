import { createLocalVue, shallowMount } from '@vue/test-utils'
import UiLazyInvent from '@/src/components/ui-lazy-invent.vue'
import { mockImageProps } from '@/src/fixtures/ui-carousel.fixture'
import { addSiblingNodeWithLoadingImage, replaceNodeWithErrorImage } from '@/src/tools/errorImage'

const mockClasList = {
  add: jest.fn()
}

const mockRemoveNode = jest.fn()

const localVue = createLocalVue()

const mockLoadingImage = {
  remove: mockRemoveNode,
  classList: mockClasList
}

localVue.directive('observe-visibility', () => {  })

jest.mock('@/src/tools/errorImage', () => {
  return {
    addSiblingNodeWithLoadingImage: jest.fn(() => mockLoadingImage),
    replaceNodeWithErrorImage: jest.fn()
  }
})

const componentConfig = () => ({
  localVue,
  propsData: { ...mockImageProps }
})

describe('UiLazyInvent', () => {
  let wrapper
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallowMount(UiLazyInvent, componentConfig())
    })
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('methods', () => {
    describe('onVisibilityChanged', () => {
      beforeEach(() => {
        wrapper = shallowMount(UiLazyInvent, componentConfig())
      })
      describe('When the item is visible', () => {
        it('should set isHidden to true', () => {
          wrapper.vm.onVisibilityChanged(true)
          expect(wrapper.vm.isHidden).toBeFalsy()
        })

        it('shouled call addSiblingNodeWithLoadingImage', () => {
          expect(addSiblingNodeWithLoadingImage).toBeCalled()
        })

        it('shouled set class lazy-image__loading to loading image', () => {
          expect(mockClasList.add).toBeCalledWith('lazy-image__loading')
        })
      })

      describe('When the item is not visible', () => {
        it('should keep isHidden in false', () => {
          wrapper.vm.onVisibilityChanged(false)
          expect(wrapper.vm.isHidden).toBeTruthy()
        })
      })
    })

    describe('onImageLoaded', () => {
      describe('When the function is called', () => {
        beforeEach(() => {
          wrapper = shallowMount(UiLazyInvent, componentConfig())
          wrapper.vm.loadingImage = mockLoadingImage
          wrapper.vm.onImageLoaded()
        })

        it('should set isImageLoaded to true', () => {
          setTimeout(()=> {
            expect(wrapper.vm.isImageLoaded).toBeTruthy()
          }, 400)
        })

        it('should set laoded class to loadingImage', () => {
          expect(mockClasList.add).toHaveBeenCalledWith('lazy-image__loading--loaded')
        })

        it('should set laoded class to loadingImage', async () => {
          const delay = () => new Promise(resolve =>
            setTimeout(resolve, 1000)
          )
          await delay()
          expect(mockRemoveNode).toHaveBeenCalled()
        })
      })
    })

    describe('onImageError', () => {
      describe('When the function is called', () => {
        const mockCurrentTarget = 'mockCurrentTarget'
        const mockEvt = {
          currentTarget: mockCurrentTarget
        }

        beforeEach(() => {
          wrapper = shallowMount(UiLazyInvent, componentConfig())
          wrapper.vm.loadingImage = mockLoadingImage
          wrapper.vm.onImageError(mockEvt)
        })

        it('should set call replaceNodeWithImage with currentTarget', () => {
          expect(replaceNodeWithErrorImage).toBeCalledWith(mockCurrentTarget)
        })

        it('should remove loading image', () => {
          expect(mockRemoveNode).toBeCalledWith()
        })
      })
    })
  })
})
