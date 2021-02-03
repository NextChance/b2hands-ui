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
  width: 100%;
  height: 100%;
  align-self: center;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    &::after {
      position: absolute;
      content: '';
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffffff;
    }

    &[lazy='loaded'] {
      opacity: 0;
      animation-name: fadein;
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-direction: normal;
      animation-timing-function: ease-out;
      &::after {
        display: none;
      }
      @keyframes fadein {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }

    &[lazy='error'] {
      display: none;
    }
  }
}
</style>
