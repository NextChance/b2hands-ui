import { action } from '@storybook/addon-actions'
import UiModal from '~/components/ui-modal'

export default {
  title: 'Ui-Modal',
  component: UiModal
}

export const carouselWithSeveralImages = () => ({
  components: { UiModal },
  data() {
    return {
      isOpen: false
    }
  },
  template: `
    <div>
        <button @click='toogleOpen'>modal</button>
        <ui-modal :isOpen='isOpen' @on-modal-close='closeModal'>
          <div class='wrapper'>
            <span>Content</span>
          </div>
        </ui-modal>
    </div>
  `,
  methods: {
    toogleOpen() {
      action('open modal')
      this.isOpen = !this.isOpen
    },
    closeModal() {
      action('event to close modal')
      this.isOpen = false
    }
  }
})
