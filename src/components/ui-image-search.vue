<template>
  <div class="image-search image-search--blend">
    <img
      :src="image.src"
      :srcset="image.srcset"
      :alt="image.alt"
      class="image-search__original">
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
          top: `${bound.top}px`,
          left: `${bound.left}px`,
          ...(activeProductReferemce === bound.product_search_reference
            ? { height:  `${bound.height}px`, width: `${bound.width}px` }
            : {}
          )
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
import { Image } from '../types/Image'
import { Bound } from '../types/Bound'

export default Vue.extend({
  name: 'ui-image-search',
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
  methods: {
    onSelectBound(bound: Bound): void {
      this.$emit('on-select-bound', bound)
    }
  }
})
</script>

<style scoped lang="scss">
.image-search {
  $imageSearch: &;

  position: relative;
  width: 100%;

  &:after {
    background-color: rgba($black-70, 0.4);
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  &--blend {
    &:after {
      mix-blend-mode: multiply;
    }
    #{$imageSearch} {
      &__bound {
        mix-blend-mode: overlay;
      }
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
    display: flex;
    justify-content: center;
    font-size: $font-size-3;
    position: absolute;
    height: $spacing-size-7;
    width: $spacing-size-7;
    z-index: 1;

    &--selected {
      border-radius: 8px;
    }
  }
}
</style>
