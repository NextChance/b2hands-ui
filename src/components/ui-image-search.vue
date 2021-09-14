<template>
  <div class="image-search">
    <ui-lazy-invent
      :src="image.src"
      :srcset="image.srcset"
      :alt="image.alt"
      :is-error-forced="isErrorForced"
      class="image-search__original"
      @on-image-loaded="onImageLoaded"
    />
    <template v-if="isImageLoaded && !isErrorForced">
      <svg
        v-if="activeBound"
        class="image-search__selected-mark"
        :height="imageSize.height"
        :width="imageSize.width"
      >
        <defs>
          <rect
            id="bound_selected"
            class="image-search__selected-mark__bound"
            :x="0"
            :y="0"
            :height="`${100 * activeBound.height}%`"
            :width="`${100 * activeBound.width}%`"
            rx="15"
            :style="`transform: translate(${100 * activeBound.left}%, ${
              100 * activeBound.top
            }%)`"
          />
          <mask id="selection">
            <rect height="100%" width="100%" fill="white" />
            <use xlink:href="#bound_selected" fill="black"></use>
          </mask>
        </defs>
        <rect
          class="image-search__selected-mark__veil"
          height="100%"
          width="100%"
          fill="#191919"
          :mask="showBound ? 'url(#selection)' : ''"
        />
        <use
          v-if="showBound"
          xlink:href="#bound_selected"
          fill="transparent"
          stroke="white"
          stroke-width="2"
        ></use>
      </svg>
      <ol
        class="image-search__bound-list"
        :style="{
          height: imageSize.height,
          width: imageSize.width
        }"
      >
        <li
          v-for="(bound, key) in bounds"
          :key="`bound-selector-${key}`"
          :class="[
            'image-search__bound',
            {
              'image-search__bound--selected':
                activeProductReference === bound.product_search_reference
            }
          ]"
          :style="{
            top: `${100 * (bound.top + bound.height / 2)}%`,
            left: `${100 * (bound.left + bound.width / 2)}%`
          }"
          @click="onSelectBound(bound)"
        >
          <i class="b2i-plus"></i>
        </li>
      </ol>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import UiLazyInvent from './ui-lazy-invent.vue'
import Image from '../types/Image'
import Bound from '../types/Bound'

interface Data {
  imageSize: {
    height: string
    width: string
  }
  isImageLoaded: boolean
  isImageMoreLandscape: boolean
  showBound: boolean
}

export default Vue.extend({
  name: 'UiImageSearch',
  components: {
    UiLazyInvent
  },
  props: {
    image: {
      type: Object as () => Image,
      default: null
    },
    bounds: {
      type: Array as PropType<Array<Bound>>,
      default: []
    },
    activeProductReference: {
      type: String,
      default: ''
    },
    isErrorForced: {
      type: Boolean,
      default: false
    }
  },
  data(): Data {
    return {
      imageSize: {
        height: '100%',
        width: '100%'
      },
      isImageLoaded: false,
      isImageMoreLandscape: false,
      showBound: false
    }
  },
  computed: {
    activeBound() {
      return this.bounds.find(
        (bound: Bound) =>
          bound.product_search_reference === this.activeProductReference
      )
    }
  },
  watch: {
    activeProductReference: {
      immediate: true,
      handler() {
        setTimeout(() => {
          this.showBound = true
        }, 100)
      }
    }
  },
  methods: {
    onSelectBound(bound: Bound): void {
      this.showBound = false
      this.$emit('on-select-bound', bound)
    },
    onImageLoaded(image: HTMLImageElement) {
      const imageAspectRatio = image.naturalWidth / image.naturalHeight
      const containerMaxAspectRatio = 0.9
      const isImageMoreLandscape = imageAspectRatio > containerMaxAspectRatio

      this.isImageLoaded = true
      this.imageSize = {
        height: isImageMoreLandscape ? '100%' : '90vw',
        width: isImageMoreLandscape ? '100%' : `${90 * imageAspectRatio}vw`
      }
    }
  }
})
</script>

<style scoped lang="scss">
.image-search {
  height: 100%;
  position: relative;
  width: 100%;

  &--landscape {
    height: auto;
    width: 100%;
  }

  &__selected-mark {
    bottom: 0;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;

    &__veil {
      opacity: 0.4;
    }

    //&__bound {
    //  transition: transform .3s, height .3s, width .3s;
    //}
  }

  &__original {
    display: block;
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  &__bound-list {
    bottom: 0;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
  }

  &__bound {
    align-items: center;
    background-color: rgba($white, 0.4);
    border: 2px solid $white;
    border-radius: 50%;
    color: $white;
    cursor: pointer;
    display: flex;
    font-size: $font-size-3;
    height: $spacing-size-7;
    justify-content: center;
    margin-left: -1 * $spacing-size-7 / 2;
    margin-top: -1 * $spacing-size-7 / 2;
    position: absolute;
    transform: scale(1);
    transform-origin: center;
    //transition: transform .2s;
    width: $spacing-size-7;
    z-index: 1;

    &--selected {
      transform: scale(0);
    }
  }

  /deep/ .placeholder-image {
    height: 100%;

    svg {
      height: 100%;
      object-fit: contain;
      width: 100%;
    }
  }

  @media (min-width: $breakpoint-s) {
    &__selected-mark,
    &__bound-list {
      height: 100% !important;
      width: 100% !important;
    }
  }
}
</style>
