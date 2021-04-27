/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import UiTabs from '@/src/components/ui-tabs.vue'

const componentConfig = {
  propsData: { value: true }
}
describe('UiTabs', () => {
  let wrapper
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallowMount(UiTabs, componentConfig)
    })
    it('is a Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('Methods', () => {
    describe('handleEyeIcon', () => {
      beforeEach(() => {
        wrapper = shallowMount(UiTabs, componentConfig)
        wrapper.vm.handleTabClick()
      })
      it('should emit the event bon-click-eye-icon', () => {
        expect(wrapper.emitted('on-tab-clicked')).toBeTruthy()
      })
    })
  })
})
