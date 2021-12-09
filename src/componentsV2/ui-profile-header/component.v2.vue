<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>
<script lang="ts">
import Vue from 'vue'
import UiLazyInvent from '../ui-lazy-invent/component.v2.vue'
import { ProfileImgUI } from '@/external/types/Profile'

export default Vue.extend({
  name: 'UiProfileHeader',
  components: {
    UiLazyInvent
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
  }
})
</script>
