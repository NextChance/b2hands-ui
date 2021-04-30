<template>
  <div v-if="isHidden || delayLoad"
       ref="visibilityPlaceholder"
       class="placeholder-image placeholder-image--loading"
       v-observe-visibility="{
      callback: onVisibilityChanged,
      intersection: {
        rootMargin: '30%'
      },
      once: true
    }">
      <svg viewBox="0 0 9 11">
        <defs>
          <linearGradient :id="`loaderGradient${rand}`" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="rgb(247, 247, 247)" stop-opacity="0"/>
            <stop offset="50%" stop-color="#FFF" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="rgb(247, 247, 247)" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect height="100%" width="100%" x="0" y="0" fill="#F7F7F7"></rect>
        <rect class="placeholder-image__loader" height="100%" width="100%" x="0" y="0" :fill="`url(#loaderGradient${rand})`"></rect>
      </svg>
  </div>
  <img
    v-else-if="src && srcset"
    ref="main"
    :src="src"
    :srcset="srcset"
    :sizes="sizes"
    :alt="alt"
    :class="[
      'lazy-image',
      {'lazy-image--loaded': isImageLoaded}
    ]"
    @load="onImageLoaded"
    @error="onImageError">
</template>

<script lang="ts">
import Vue from 'vue'
import { addSiblingNodeWithLoadingImage, replaceNodeWithErrorImage } from '../tools/errorImage'

export default Vue.extend({
  name: 'ui-lazy-lazy-image',
  data() {
    const data: {
      isHidden: Boolean,
      isImageLoaded: Boolean,
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
    }
  },
  watch: {
    isErrorForced(newValue) {
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
        this.loadingImage?.classList.add('lazy-image__loading')
      }
    },
    onImageLoaded(): void {
      this.loadingImage?.classList.add('lazy-image__loading--loaded')
      setTimeout(() => {
        this.isImageLoaded = true
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

<style scoped lang="scss">
.lazy-image {
  $lazy-image: &;

  object-fit: cover;
  opacity: 0;
  position: absolute;
  transition: opacity .3s ease-in;
  width: 100%;

  &--loaded {
    opacity: 1;
    position: static;
    z-index: 1;
  }

  /deep/ {
    ~ #{$lazy-image}__loading {
      transition: opacity .3s ease-in;
      @include text-skeleton;
    }
  }
}
</style>
