import { createLocalVue, shallowMount } from '@vue/test-utils'
import UiSearchImage from '@/src/components/ui-image-search.vue'
import { ImageWithBoundsPreselected } from '@/src/fixtures/ui-image-search.fixture'

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
  propsData: { ...ImageWithBoundsPreselected }
})

describe('UiSearchImage', () => {
  let wrapper
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallowMount(UiSearchImage, componentConfig())
    })
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('methods', () => {
    describe('onSelectBound', () => {
      const mockBound = 'mockBound'
      beforeEach(() => {
        wrapper = shallowMount(UiSearchImage, componentConfig())
        wrapper.vm.onSelectBound(mockBound)
      })

      it('should emit the event properly', () => {
        expect(wrapper.emitted()['on-select-bound'][0][0]).toBe(mockBound)
      })
    })

    describe('onImageLoaded', () => {
      describe('When the image aspect ratio is greater than container max ratio (90% width)', () => {
        const imageAspectRatio = 1
        const mockImageElement = {
          naturalHeight: 200,
          naturalWidth: 200 * imageAspectRatio
        }
        const expectedImageSide = {
          height: '100%',
          width: '100%'
        }

        beforeEach(() => {
          wrapper = shallowMount(UiSearchImage, componentConfig())
          wrapper.vm.onImageLoaded(mockImageElement)
        })

        it('should set image loaded to true', () => {
          expect(wrapper.vm.isImageLoaded).toBeTruthy()
        })

        it('should set imageSize properly', () => {
          expect(wrapper.vm.imageSize).toEqual(expectedImageSide)
        })
      })

      describe('When the image aspect ratio is lower than container max ratio (90% width)', () => {
        const imageAspectRatio = .5
        const mockImageElement = {
          naturalHeight: 200,
          naturalWidth: 200 * imageAspectRatio
        }
        const expectedImageSide = {
          height: '90vw',
          width: `${90 * imageAspectRatio}vw`
        }

        beforeEach(() => {
          wrapper = shallowMount(UiSearchImage, componentConfig())
          wrapper.vm.onImageLoaded(mockImageElement)
        })

        it('should set image loaded to true', () => {
          expect(wrapper.vm.isImageLoaded).toBeTruthy()
        })

        it('should set imageSize properly', () => {
          expect(wrapper.vm.imageSize).toEqual(expectedImageSide)
        })
      })
    })
  })
})
