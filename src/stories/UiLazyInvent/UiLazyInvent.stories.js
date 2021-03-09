import UiLazyInvent from '~/components/ui-lazy-invent'

import {
  mockImageProps,
  mockErrorImageProps
} from '~/fixtures/ui-lazy-invent.fixture.js'

export default {
  title: 'UI-Lazy-Invent',
  component: UiLazyInvent
}

export const regularCase = () => ({
  components: {
    UiLazyInvent
  },
  data() {
    return {
      mockImageProps
    }
  },
  template: `
    <div class="story-ui-lazy-invent">
      <ui-lazy-invent :alt="mockImageProps.alt" :src="mockImageProps.src" :srcset="mockImageProps.srcset"></ui-lazy-invent>
    </div>
  `
})

export const withError = () => ({
  components: {
    UiLazyInvent
  },
  data() {
    return {
      mockErrorImageProps
    }
  },
  template: `
    <div class="story-ui-lazy-invent">
      <ui-lazy-invent :alt="mockErrorImageProps.alt" :src="mockErrorImageProps.src" :srcset="mockErrorImageProps.srcset"></ui-lazy-invent>
    </div>
  `
})
