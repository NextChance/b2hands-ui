<template src="./index.html"></template>
<style scoped lang="scss" src="./styles.scss"></style>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue3'
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
    }
  },
  emits: [
    'on-more-options-clicked',
    'on-profile-clicked'
  ],
  setup(props, { emit }) {
    let showImage =  ref(true)

    const handleMoreOptions = (event: Event): void => {
      event.preventDefault()
      emit('on-more-options-clicked')
    }

    const onClickProfile = (event: Event): void => {
      event.preventDefault()
      emit('on-profile-clicked')
    }

    watch(
    () => props.profileImage, (profileImage:ProfileImgUI) => {
      if (!profileImage.url && !profileImage.srcSet) {
        showImage.value = false
        setTimeout(() => {
          showImage.value = true
        }, 10)

      }
    })

    return {
      handleMoreOptions,
      onClickProfile
    }
  }
})
</script>
