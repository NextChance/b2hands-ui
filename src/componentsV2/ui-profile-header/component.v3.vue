<template src="./index.html"></template>
<style scoped lang="scss" src="./styles.scss"></style>
<script lang="ts">
import { defineComponent } from 'vue3'
import UiLazyInvent from '../ui-lazy-invent/component.v3.vue'
import { ProfileImgUI } from '@/external/types/Profile'

export default defineComponent({
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
    profileRoute: {
      type: String,
      default: ''
    },
    hasProfileLink: {
      type: Boolean,
      default: false
    },
    isHiddenMoreOptions: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleMoreOptions = (event: Event): void => {
      event.preventDefault()
      emit('on-more-options-clicked')
    }

    const onClickProfile = (event: Event): void => {
      event.preventDefault()
      emit('on-profile-clicked')
    }

    return {
      handleMoreOptions,
      onClickProfile
    }
  }
})
</script>
