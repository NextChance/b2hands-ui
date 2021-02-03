import UiCarousel from '~/components/ui-carousel'

export default {
  title: 'UI-carousel',
  component: UiCarousel
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const carousel = () => ({
  components: { UiCarousel },
  template: '<div class="story-container carousel"><ui-carousel/></div>'
})
