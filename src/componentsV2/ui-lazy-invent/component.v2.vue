<template src="./index.html"></template>
<style lang='scss' scoped src='./styles-scoped.scss'></style>
<style lang="scss" src="./styles.scss"></style>

<script lang="ts">
import Vue from 'vue'
import { addSiblingNodeWithLoadingImage, replaceNodeWithErrorImage } from '@/external/tools/errorImage'

export default Vue.extend({
  name: 'ui-lazy-lazy-image',
  data() {
    const data: {
      isHidden: boolean,
      isImageLoaded: boolean,
      loadingImage: HTMLElement | null
      rand: string
    } = {
      isImageLoaded: false,
      isHidden: true,
      loadingImage: null,
      rand: (Math.random() * 1000).toFixed()
    }
    return data
  },
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
  watch: {
    isErrorForced(newValue): void {
      if (newValue) {
        if (this.$refs.main) {
          (this.$refs.main as Element).dispatchEvent(new Event('error'))
        }else if (this.$refs.visibilityPlaceholder) {
          replaceNodeWithErrorImage(this.$refs.visibilityPlaceholder as HTMLElement)
        }
      }
    }
  },
  methods: {
    onVisibilityChanged(isVisible: boolean): void {
      if (isVisible) {
        this.isHidden = false
        this.loadingImage = addSiblingNodeWithLoadingImage(this.$refs.visibilityPlaceholder as HTMLElement)
        this.loadingImage?.classList.add('lazy-image__loading');
        if (this.loadingHeight && this.loadingWidth) {
          this.loadingImage.style.height = `${this.loadingHeight}px`
          this.loadingImage.style.width = `${this.loadingWidth}px`
        }
        (this.$refs.visibilityPlaceholder as HTMLElement).classList.add('lazy-image--hide')
        this.$emit('image-visible')
      }
    },
    onImageLoaded(): void {
      this.loadingImage?.classList.add('lazy-image__loading--loaded')
      this.isImageLoaded = true
      setTimeout(() => {
        this.loadingImage?.remove()
      }, 350)
      this.$emit('on-image-loaded', this.$refs.main)
    },
    onImageError(evt: Event): void {
      replaceNodeWithErrorImage(evt.currentTarget as HTMLElement)
      this.loadingImage?.remove()
      this.$emit('on-image-error')
    }
  },
  mounted() {
    if (this.isErrorForced) {
      replaceNodeWithErrorImage(this.$refs.visibilityPlaceholder as HTMLElement)
    }
  }
})
</script>
