/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import UiSearchInput from '@/src/components/ui-search-input.vue'

const textMocked = 'text search'
// eslint-disable-next-line @typescript-eslint/no-empty-function
const event = { preventDefault: jest.fn() }
const componentConfig = {
  propsData: {
    id: 'mockId',
    hasAutoFocus: true
  }
}
describe('UiSearchInput', () => {
  let wrapper
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallowMount(UiSearchInput, componentConfig)
    })
    it('is Vue instance', () => {
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('methods', () => {
    describe('handleClickDelete()', () => {
      beforeEach(() => {
        wrapper = shallowMount(UiSearchInput, componentConfig)
        wrapper.setData({
          textValue: textMocked
        })
        wrapper.vm.handleClickDelete()
      })
      it('should emit on-clear-input event', () => {
        expect(wrapper.emitted('on-clear-input')).toBeTruthy()
      })
      it('should set textValue to an empty string', () => {
        expect(wrapper.vm.textValue).toBe('')
      })
    })

    describe('handleInputFocus()', () => {
      beforeEach(() => {
        wrapper = shallowMount(UiSearchInput, componentConfig)
        wrapper.vm.handleInputFocus()
      })
      it('should set searchIsFocused to true', () => {
        expect(wrapper.vm.searchIsFocused).toEqual(true)
      })
    })

    describe('handleSearch()', () => {
      beforeEach(() => {
        wrapper = shallowMount(UiSearchInput, componentConfig)
        wrapper.setData({
          textValue: textMocked
        })
        wrapper.vm.handleSearch(event)
      })
      it('should emit on-search-done event', () => {
        expect(wrapper.emitted('on-search-done')).toBeTruthy()
        expect(wrapper.emitted()['on-search-done'][0]).toEqual([textMocked])
      })
    })
  })
})
