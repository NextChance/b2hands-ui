<template src="./index.html"></template>
<style>
.lazy-image + .placeholder-image {
  position: absolute;
}
</style>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue3'
import { addSiblingNodeWithLoadingImage, replaceNodeWithErrorImage } from '@/external/tools/errorImage'
import type AnyObject from '@/external/types/AnyObject'

export default defineComponent({
  name: 'ui-lazy-lazy-image',
  props: {
    /**
     * Src url to use in case srset is not available
     */
    src: {
      type: String,
      default: ''
    },
    /**
     * Formatted srcset
     */
    srcset: {
      type: String,
      default: ''
    },
    /**
     * Usage image size
     */
    sizes: {
      type: String,
      default: ''
    },
    /**
     * Text to use in accesibility mode
     */
    alt: {
      type: String,
      default: ''
    },
    /**
     * Whether the image should still showing a loading state until parent requires it
     */
    delayLoad: {
      type: Boolean,
      default: false
    },
    /**
     * Whether the image should still showing a loading state until parent requires it
     */
    isErrorForced: {
      type: Boolean,
      default: false
    },
    /**
     * Predefined image height to show while loading
     */
    loadingHeight: {
      type: Number,
      default: 0
    },
    /**
     * Predefined image width to show while loading
     */
    loadingWidth: {
      type: Number,
      default: 0
    },
    forceImageLoad: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'image-visible',
    'on-image-error',
    'on-image-loaded'
  ],
  setup (props, {emit}) {
    const visibilityPlaceholder = ref<HTMLElement | null>(null)
    const main = ref<HTMLElement | null>(null)
    const showImage = ref(false)
    showImage.value = true

    let isImageLoaded = false
    let isHidden = ref(true)
    let loadingImage:any = null

    const rand = (Math.random() * 1000).toFixed()

    const onVisibilityChanged = (isVisible: boolean): void => {
      if (isVisible) {
        isHidden.value = false
        loadingImage = addSiblingNodeWithLoadingImage(
          visibilityPlaceholder.value as HTMLElement
        )
        loadingImage?.classList.add('lazy-image__loading')
        if (props.loadingHeight && props.loadingWidth) {
          loadingImage.style.height = `${props.loadingHeight}px`
          loadingImage.style.width = `${props.loadingWidth}px`
        }
        (visibilityPlaceholder.value as HTMLElement).classList.add('lazy-image--hide')
        emit('image-visible')
      }
    }

    const onImageLoaded = (): void => {
      loadingImage?.classList.add('lazy-image__loading--loaded')
      isImageLoaded = true
      setTimeout(() => {
        loadingImage?.remove()
      }, 5350)
      emit('on-image-loaded', main)
    }

    const onImageError = (evt: Event): void => {
      replaceNodeWithErrorImage(evt.currentTarget as HTMLElement)
      loadingImage?.remove()
      emit('on-image-error')
    }

    watch(() => props.profileImage, (newImage: AnyObject) => {
      if (Object.keys(newImage).length) {
        showImage.value = false
        setTimeout(() => {
          showImage.value = true
        }, 10)
      }
    })

    onMounted(() => {
      if (props.isErrorForced) {
        replaceNodeWithErrorImage(visibilityPlaceholder.value as HTMLElement)
      }
    })

    return {
      visibilityPlaceholder,
      main,
      isImageLoaded,
      isHidden,
      rand,
      onImageError,
      onImageLoaded,
      onVisibilityChanged
    }
  }
})
</script>
