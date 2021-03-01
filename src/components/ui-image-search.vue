<template>
  <div class="image-search image-search--blend">
    <ui-lazy-invent
      :src="image.src"
      :srcset="image.srcset"
      :alt="image.alt"
      class="image-search__original"
      @on-image-loaded="onImageLoaded"/>
    <svg
      v-if="activeBound"
      class="image-search__selected-mark"
      :height="imageSize.height"
      :width="imageSize.width"
    >
      <defs>
        <rect
          id="bound_selected"
          :x="activeBound.left * imageSize.width"
          :y="activeBound.top * imageSize.height"
          :height="activeBound.height * imageSize.height"
          :width="activeBound.width * imageSize.width"
          rx="15"/>
        <mask id="selection">
          <rect
            height="100%"
            width="100%"
            fill="white"
          />
          <use xlink:href="#bound_selected" fill="black"></use>
        </mask>
      </defs>
      <rect
        class="image-search__selected-mark__veil"
        height="100%"
        width="100%"
        fill="#191919"
        mask="url(#selection)"
      />
      <use
        xlink:href="#bound_selected"
        fill="transparent"
        stroke="white"
        stroke-width="2"
      ></use>
    </svg>
    <ol class="image-search__bound-list">
      <li
        v-for="(bound, key) in bounds"
        :key="`bound-selector-${key}`"
        :class="[
          'image-search__bound',
          {
            'image-search__bound--selected': activeProductReferemce === bound.product_search_reference
          }
        ]"
        :style="{
          top: `${imageSize.height * bound.top}px`,
          left: `${imageSize.width * bound.left}px`
        }"
        @click="onSelectBound(bound)"
      >
        <i class="b2i-plus"></i>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UiLazyInvent from './ui-lazy-invent.vue'
import { Image } from '../types/Image'
import { Bound } from '../types/Bound'

export default Vue.extend({
  name: 'ui-image-search',
  components: {
    UiLazyInvent
  },
  data() {
    return {
      imageSize: {
        height: 0,
        width: 0
      }
    }
  },
  props:{
    image: {
      type: Image,
      default: null
    },
    bounds: {
      type: Array,
      default: []
    },
    activeProductReferemce: {
      type: String,
      default: ''
    }
  },
  computed: {
    activeBound () {
      return this.bounds.find(bound => (bound as Bound).product_search_reference === this.activeProductReferemce)
    }
  },
  methods: {
    onSelectBound(bound: Bound): void {
      this.$emit('on-select-bound', bound)
    },
    onImageLoaded(image: HTMLMediaElement) {
      console.log('image', image)
      this.imageSize = {
        height: image.offsetHeight,
        width: image.offsetWidth
      }
    }
  }
})
</script>

<style scoped lang="scss">
.image-search {
  $imageSearch: &;

  position: relative;
  width: 100%;

  &__selected-mark {
    position: absolute;
    left: 0;
    top: 0;

    &__veil {
      opacity: 0.4;
    }
  }

  &__original {
    display: block;
    width: 100%;
  }

  &__bound {
    align-items: center;
    background-color: rgba($white, .4);
    border: 2px solid $white;
    border-radius: 50%;
    color: $white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: $font-size-3;
    position: absolute;
    height: $spacing-size-7;
    width: $spacing-size-7;
    z-index: 1;

    &--selected {
      display: none;
    }
  }
}
</style>
