import { action } from '@storybook/addon-actions'
import UiTextarea from '~/componentsV2/ui-textarea/component.v2.vue'

export default {
  title: 'UI-textarea',
  component: UiTextarea
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Textarea = () => ({
  components: { UiTextarea },
  data() {
    return {}
  },
  template: `
    <div class="story-textarea">
      <ui-textarea
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    </div>`,
  methods: {}
})
