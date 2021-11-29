<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { defineComponent, ref } from 'vue3'
import UiLazyInvent from '../ui-lazy-invent/component.v3.vue'

interface ImgItem {
  src: string
  srcSets: string
  alt: string
}

export default defineComponent({
  name: 'ui-carousel',
  components: {
    'ui-lazy-invent': UiLazyInvent
  },
  props: {
    items: {
      type: Array,
      default: (): Array<ImgItem> => []
    },
    extraContent: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    errorImage: {
      type: String,
      default: ''
    },
    placeholderImage: {
      type: String,
      default: ''
    }
  },
  emits: [
    'on-thumbnail'
  ],
  setup (props, { emit }) {
    let isFirstImageLoaded = ref(false)
    let isAnyImageLoaded = ref(false)
    const imageActions = ref(null)

    const onImageLoaded = (index: number): void => {
      isAnyImageLoaded.value = true
      if( index===0 ) {
        isFirstImageLoaded.value = true
      }
    }

    const onImageError = (refIndex: number): void => {
      const element = (imageActions.value as HTMLElement[])[refIndex]
      if (element) {
        element.classList.add('nav-actions--error')
      }
    }

    const getPosition = ($event: Event, id: string): void => {
      $event.preventDefault()
      emit('on-thumbnail', id)
    }

    return {
      isFirstImageLoaded,
      isAnyImageLoaded,
      onImageLoaded,
      onImageError,
      getPosition
    }

  }
})
</script>
