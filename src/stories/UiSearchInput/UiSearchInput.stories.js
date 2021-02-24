/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { action } from '@storybook/addon-actions'
import UiSearchInput from '~/components/ui-search-input'
export default {
  title: 'UI-search-input',
  component: UiSearchInput
}

export const uiSearchInputBasic = () => ({
  components: { UiSearchInput },
  template: `
    <div class="story-search-input">
      <ui-search-input
        id="basicInput"
        @on-clear-input="handleClearInput"
        @on-search-done="handleSearch"
      />
    </div>
  `,
  methods: {
    handleClearInput: action('clear field'),
    handleSearch: action(`(search text) text`)
  }
})

export const uiSearchWithPlaceholder = () => ({
  components: { UiSearchInput },
  template: `
    <div class="story-search-input">
      <ui-search-input
        id="basicInput"
        placeholder="Placeholder"
        @on-clear-input="handleClearInput"
        @on-search-done="handleSearch"
      />
    </div>
  `,
  methods: {
    handleClearInput: action('clear field'),
    handleSearch: action(`(search text) text`)
  }
})
