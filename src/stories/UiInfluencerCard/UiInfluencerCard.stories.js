/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
import { action } from '@storybook/addon-actions'
import UiInfluencerCard from '~/components/ui-influencer-card'

export default {
  title: 'ui-influencer-card',
  component: UiInfluencerCard
}

const profiles = [
  {
    imageSet: {
      smallest:
        'https://thumbnails-dev.nc43tech.com/eyJmb3JtYXQiOiJqcGVnIiwiaW1hZ2VVcmwiOiJodHRwczovL3MzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2Fzc2V0cy1kZXYubmM0M3RlY2guY29tL2luZmx1ZW5jZXJzL2QzZTNhOGZkLTgxMWEtNDI0Ny05Y2VjLTkwYTYyNTMyNDg1Ny82MGEyZjA3ZC0wMDQwLTQxZGQtODYxNy03M2RlZDk1NWQ2N2QiLCJ3aWR0aCI6MTYwfQ==',
      srcSet:
        'https://thumbnails-dev.nc43tech.com/eyJmb3JtYXQiOiJqcGVnIiwiaW1hZ2VVcmwiOiJodHRwczovL3MzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2Fzc2V0cy1kZXYubmM0M3RlY2guY29tL2luZmx1ZW5jZXJzL2QzZTNhOGZkLTgxMWEtNDI0Ny05Y2VjLTkwYTYyNTMyNDg1Ny82MGEyZjA3ZC0wMDQwLTQxZGQtODYxNy03M2RlZDk1NWQ2N2QiLCJ3aWR0aCI6MTYwfQ==',
    },
    url: '',
    alt: 'foto de perfil de influencer name ',
    name: 'influencer name',
    instagram_handler: 'InstagramNameInstagramNameInstagramNameInstagramNameInstagramNameInstagramNameInstagramName'
  },
  {
    imageSet: {
      smallest:
        'https://thumbnails-dev.nc43tech.com/eyJmb3JtYXQiOiJqcGVnIiwiaW1hZ2VVcmwiOiJodHRwczovL3MzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2Fzc2V0cy1kZXYubmM0M3RlY2guY29tL2luZmx1ZW5jZXJzL2QzZTNhOGZkLTgxMWEtNDI0Ny05Y2VjLTkwYTYyNTMyNDg1Ny82MGEyZjA3ZC0wMDQwLTQxZGQtODYxNy03M2RlZDk1NWQ2N2QiLCJ3aWR0aCI6MTYwfQ==',
      srcSet:
        'https://thumbnails-dev.nc43tech.com/eyJmb3JtYXQiOiJqcGVnIiwiaW1hZ2VVcmwiOiJodHRwczovL3MzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2Fzc2V0cy1kZXYubmM0M3RlY2guY29tL2luZmx1ZW5jZXJzL2QzZTNhOGZkLTgxMWEtNDI0Ny05Y2VjLTkwYTYyNTMyNDg1Ny82MGEyZjA3ZC0wMDQwLTQxZGQtODYxNy03M2RlZDk1NWQ2N2QiLCJ3aWR0aCI6MTYwfQ==',
    },
    url: '',
    alt: 'foto de perfil de influencer name 2',
    name: 'influencer name 2',
    instagram_handler: 'InstagramName2'
  },
  {
    imageSet: {
      smallest:
        'https://thumbnails-dev.nc43tech.com/eyJmb3JtYXQiOiJqcGVnIiwiaW1hZ2VVcmwiOiJodHRwczovL3MzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2Fzc2V0cy1kZXYubmM0M3RlY2guY29tL2luZmx1ZW5jZXJzL2QzZTNhOGZkLTgxMWEtNDI0Ny05Y2VjLTkwYTYyNTMyNDg1Ny82MGEyZjA3ZC0wMDQwLTQxZGQtODYxNy03M2RlZDk1NWQ2N2QiLCJ3aWR0aCI6MTYwfQ==',
      srcSet:
        'https://thumbnails-dev.nc43tech.com/eyJmb3JtYXQiOiJqcGVnIiwiaW1hZ2VVcmwiOiJodHRwczovL3MzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2Fzc2V0cy1kZXYubmM0M3RlY2guY29tL2luZmx1ZW5jZXJzL2QzZTNhOGZkLTgxMWEtNDI0Ny05Y2VjLTkwYTYyNTMyNDg1Ny82MGEyZjA3ZC0wMDQwLTQxZGQtODYxNy03M2RlZDk1NWQ2N2QiLCJ3aWR0aCI6MTYwfQ==',
    },
    url: '',
    alt: 'foto de perfil de influencer name 3',
    name: 'influencer name 3',
    instagram_handler: 'InstagramName3'
  }
]

const postImages = [
  {
    url:
      'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/20/16294690912004.jpg',
    srcSet:
      'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/20/16294690912004.jpg 160w, https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/20/16294690912004.jpg 320w, https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/20/16294690912004.jpg 480w, https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/20/16294690912004.jpg 640w, https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/20/16294690912004.jpg 960w, https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/20/16294690912004.jpg 1440w',
    alt: 'foto de perfil de influencer name'
  },
  {
    url:
      'https://deelay.me/1000/https://m.tribuneindia.com/2013/20130210/spectrum/wellbeing3.jpg',
    srcSet:
      'https://deelay.me/1000/https://m.tribuneindia.com/2013/20130210/spectrum/wellbeing3.jpg 160w, https://deelay.me/1000/https://m.tribuneindia.com/2013/20130210/spectrum/wellbeing3.jpg 320w, https://deelay.me/1000/https://m.tribuneindia.com/2013/20130210/spectrum/wellbeing3.jpg 480w, https://deelay.me/1000/https://m.tribuneindia.com/2013/20130210/spectrum/wellbeing3.jpg 640w, https://deelay.me/1000/https://m.tribuneindia.com/2013/20130210/spectrum/wellbeing3.jpg 960w, https://deelay.me/1000/https://m.tribuneindia.com/2013/20130210/spectrum/wellbeing3.jpg 1440w',
    alt: 'foto de perfil de influencer name'
  },
  {
    url:
      'https://flandecoco.net/wp-content/uploads/2020/06/Blog-influencers.jpg',
    srcSet:
      'https://flandecoco.net/wp-content/uploads/2020/06/Blog-influencers.jpg 160w, https://flandecoco.net/wp-content/uploads/2020/06/Blog-influencers.jpg 320w, https://flandecoco.net/wp-content/uploads/2020/06/Blog-influencers.jpg 480w, https://flandecoco.net/wp-content/uploads/2020/06/Blog-influencers.jpg 640w, https://flandecoco.net/wp-content/uploads/2020/06/Blog-influencers.jpg 960w, https://flandecoco.net/wp-content/uploads/2020/06/Blog-influencers.jpg 1440w',
    alt: 'foto de perfil de influencer name'
  }
]

const bounds = [
  {
    height: 0.33,
    width: 0.4,
    top: 0.05,
    left: 0.22,
    product_search_reference: 'bound-1'
  },
  {
    height: 0.6,
    width: 0.24,
    top: 0.2,
    left: 0.7,
    product_search_reference: 'bound-2'
  },
  {
    height: 0.2,
    width: 0.54,
    top: 0.75,
    left: 0.3,
    product_search_reference: 'bound-3'
  }
]

export const influencerCardBasic = () => ({
  components: { UiInfluencerCard },
  data() {
    return {
      profiles,
      postImage,
      date: '30 de Junio',
      bounds
    }
  },
  template: `
  <div class="story-ui-influencer-card-container">
    <ui-influencer-card
      :profile="profiles[0]"
      :post-image="postImages[0]"
      :date="date"
      :bounds="bounds"
      action-text="Ver similares"
      @click="onClickIcon"
      @on-select-bound="onBoundSelected"
    />
  </div>`,
  methods: {
    onClickIcon: action(`go to image search`),
    onBoundSelected: action(`bound selected`)
  }
})

export const influencerCardList = () => ({
  components: { UiInfluencerCard },
  data() {
    return {
      profiles,
      postImages,
      date: '30 de Junio',
      bounds
    }
  },
  template: `
  <div class="story-ui-influencer-card-container">
    <ul class="list col-container">
      <li class="item col-12--xs col-12--s col-12--m">
        <ui-influencer-card
          :profile="profiles[0]"
          :post-image="postImages[0]"
          :date="date"
          :bounds="bounds"
          action-text="Ver similares"
          @click="onClickIcon"
          @on-select-bound="onBoundSelected"
        />
      </li>
      <li class="item col-12--xs col-12--s col-12--m">
        <ui-influencer-card
          :profile="profiles[1]"
          :post-image="postImages[1]"
          :date="date"
          :bounds="bounds"
          action-text="Ver similares"
          @click="onClickIcon"
          @on-select-bound="onBoundSelected"
        />
      </li>
      <li class="item col-12--xs col-12--s col-12--m">
        <ui-influencer-card
          :profile="profiles[2]"
          :post-image="postImages[2]"
          :date="date"
          :bounds="bounds"
          action-text="Ver similares"
          @click="onClickIcon"
          @on-select-bound="onBoundSelected"
        />
      </li>
    </ul>
  </div>`,
  methods: {
    onClickIcon: action(`go to image search`),
    onBoundSelected: action(`bound selected`)
  }
})
