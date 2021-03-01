<template>
  <div v-if="isHidden"
       ref="visibilityPlaceholder"
       v-observe-visibility="{
      callback: onVisibilityChanged,
      intersection: {
        rootMargin: '30%'
      },
      once: true
    }"></div>
  <img
    v-else
    ref="main"
    :src="src"
    :srcset="srcset"
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
    } = {
      isImageLoaded: false,
      isHidden: true,
      loadingImage: null
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
     * Text to use in accesibility mode
     */
    alt: {
      type: String,
      default: ''
    }
  },
  methods: {
    onVisibilityChanged(isVisible: boolean): void {
      if (isVisible) {
        this.isHidden = false
      }
    },
    onImageLoaded(): void {
      this.isImageLoaded = true
      this.loadingImage?.classList.add('lazy-image__loading--loaded')
      setTimeout(() => {
        this.loadingImage?.remove()
      }, 10)
      this.$emit('on-image-loaded', this.$refs.main)
    },
    onImageError(evt: Event) {
      replaceNodeWithErrorImage(evt.currentTarget as HTMLElement)
      this.loadingImage?.remove()
      this.$emit('on-image-error')
    }
  },
  mounted() {
    this.loadingImage = addSiblingNodeWithLoadingImage(this.$refs.visibilityPlaceholder as HTMLElement)
    this.loadingImage?.classList.add('lazy-image__loading')
  }
})
</script>

<style scoped lang="scss">
.lazy-image {
  $lazyImage: &;

  object-fit: cover;
  position: absolute;
  opacity: 0;
  transition: opacity .3s ease-in;
  width: 100%;

  &--loaded {
    opacity: 1;
    position: static;
    z-index: 1;
  }

  /deep/ {
    ~ #{$lazyImage}__loading {
      width: 100%;

      &--loaded {
        position: absolute;
      }
    }
  }
}
</style>
