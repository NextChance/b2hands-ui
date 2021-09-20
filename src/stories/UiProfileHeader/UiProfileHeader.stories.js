/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
import { action } from '@storybook/addon-actions'
import UiProfileHeader from '~/components/ui-profile-header'

export default {
  title: 'ui-Profile-header',
  component: UiProfileHeader
}

const imageSet = {
  smallest:
    'https://thumbnails-dev.nc43tech.com/eyJmb3JtYXQiOiJqcGVnIiwiaW1hZ2VVcmwiOiJodHRwczovL3MzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2Fzc2V0cy1kZXYubmM0M3RlY2guY29tL2luZmx1ZW5jZXJzL2QzZTNhOGZkLTgxMWEtNDI0Ny05Y2VjLTkwYTYyNTMyNDg1Ny82MGEyZjA3ZC0wMDQwLTQxZGQtODYxNy03M2RlZDk1NWQ2N2QiLCJ3aWR0aCI6MTYwfQ==',
    srcSet:
    'https://thumbnails-dev.nc43tech.com/eyJmb3JtYXQiOiJqcGVnIiwiaW1hZ2VVcmwiOiJodHRwczovL3MzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2Fzc2V0cy1kZXYubmM0M3RlY2guY29tL2luZmx1ZW5jZXJzL2QzZTNhOGZkLTgxMWEtNDI0Ny05Y2VjLTkwYTYyNTMyNDg1Ny82MGEyZjA3ZC0wMDQwLTQxZGQtODYxNy03M2RlZDk1NWQ2N2QiLCJ3aWR0aCI6MTYwfQ==',
}

export const UiProfileHeaderBasic = () => ({
  components: { UiProfileHeader },
  data() {
    return {
      imageSet
    }
  },
  template: `
    <div class="story-ui-profile-header-container">
    <ui-profile-header
      :profile-image="imageSet"
      alt="user alt"
      user-name ="userName"
      secondary-info="secondaryInfo"
      @on-more-options-clicked="onClickMoreOptions"
    />
  </div>`,
  methods: { onClickMoreOptions: action('open modal') }
})
