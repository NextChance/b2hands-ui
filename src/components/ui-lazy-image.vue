<template>
  <div v-lazy-container="{ selector: 'img' }" class="ui-lazy-image">
    <img
      :alt="alt"
      :data-src="src"
      :data-srcset="srcSets"
      :sizes="sizes"
      :data-error="error"
      :data-loading="placeholder"
      class="ui-lazy-image__image"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'UiLazyImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    srcSets: {
      type: String,
      default: ''
    },
    sizes: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.ui-lazy-image {
  position: relative;
  align-self: center;
  height: 100%;
  width: 100%;
  @include affrodance-velo;

  &__image {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;

    &[lazy='loaded'] {
      animation-direction: normal;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      animation-name: fadein;
      animation-timing-function: ease-out;
      opacity: 0;
      @keyframes fadein {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
}
</style>
