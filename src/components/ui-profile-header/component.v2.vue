<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
import UiLazyInvent from '../ui-lazy-invent/component.v2.vue'
import type { ProfileImgUI } from '@/external/types/Profile'

export default Vue.extend({
  name: 'UiProfileHeader',
  components: {
    UiLazyInvent
  },
  data () {
    return {
      showImage: true
    }
  },
  props: {
    profileImage: {
      type: Object as () => ProfileImgUI,
      default: () => ({})
    },
    alt: {
      type: String,
      default: 'image'
    },
    userName: {
      type: String,
      default: ''
    },
    secondaryInfo: {
      type: String,
      default: ''
    },
    moreOptions: {
      type: String,
      default: ''
    },
    areMoreOptionsHidden: {
      type: Boolean,
      default: false
    },
    profileRoute: {
      type: String,
      default: ''
    },
    hasProfileLink: {
      type: Boolean,
      default: false
    },
    hideSecondaryInfo: {
      type: Boolean,
      default: false
    },
    showInitials: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    profileImage (newProfileImage) {
      if (!newProfileImage.url && !newProfileImage.srcSet) {
        this.showImage = false
        setTimeout(() => {
          this.showImage = true
        }, 10)
      }
    }
  },
  methods: {
    handleMoreOptions(event: Event): void {
      event.preventDefault()
      this.$emit('on-more-options-clicked')
    },
    onClickProfile(event: Event): void {
      event.preventDefault()
      this.$emit('on-profile-clicked')
    }
  },

  computed: {
    userInitials (): string {
      return this.userName
        .split(' ')
        .map(word => word === 'de' ? 'd' : word.charAt(0).toUpperCase())
        .join('')
    }
  }
})
</script>
