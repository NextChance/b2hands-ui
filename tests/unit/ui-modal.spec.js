/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import UiModal from '@/src/components/ui-modal.vue'

const componentConfig = {
  propsData: { value: true }
}
describe('UiModal', () => {
  let wrapper
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallowMount(UiModal, componentConfig)
    })
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('Methods', () => {
    describe('handleEyeIcon', () => {
      beforeEach(() => {
        wrapper = shallowMount(UiModal, componentConfig)
        wrapper.vm.handleClose()
      })
      it('should emit the event bon-click-eye-icon', () => {
        expect(wrapper.emitted('on-modal-close')).toBeTruthy()
      })
    })
  })
})
