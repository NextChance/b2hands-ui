import { action } from '@storybook/addon-actions'
import UiStars from '~/componentsV2/ui-stars/component.v2.vue'

export default {
  title: 'UI-stars',
  component: UiStars
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Stars = () => ({
  components: { UiStars },
  data() {
    return {}
  },
  template: `
    <div>
      <ui-stars
        :value="4"
        total-amount="5"
      />
    </div>`,
  methods: {}
})

export const StarsEditable = () => ({
  components: { UiStars },
  data() {
    return {
      ratingsPoints: 5
    }
  },
  template: `
    <div class="story-stars-input">
      <ui-stars
        :value="ratingsPoints"
        :is-editable="true"
        @on-rating-selected="setRatingAmount"
      />
    </div>`,
  methods: { setRatingAmount: action(`(rating stars selected) total`) }
})
