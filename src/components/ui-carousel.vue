<template>
  <div class="ui-carousel col-container">
    <ul class="ui-carousel__thumbnails col-2--s">
      <li
        v-for="(item, index) in items"
        :key="`carousel-thumbnails-${index}`"
        class="ui-carousel__thumbnails__item"
      >
        <a
          @click='getPosition($event,`#image-${index}`)'
          :href="`#image-${index}`">
          <ui-lazy-invent
            class="ui-carousel__thumbnails__image"
            :alt="`thumbnails-${item.alt}`"
            :src="item.src"
            sizes="5.6vw"
            :srcset="item.srcSets"
          ></ui-lazy-invent>
        </a>
      </li>
    </ul>
    <div
      class="ui-carousel__gallery col-12--xs col-10--s"
      :class="{
        'ui-carousel__gallery--one-image': items.length === 1,
        'ui-carousel__gallery--active': isAnyImageLoaded
      }"
    >
      <ul class="ui-carousel__gallery__list">
        <li
          v-for="(item, index) in items"
          :id="`image-${index}`"
          :key="`carousel-${index}`"
          class="ui-carousel__gallery__item"
        >
          <ui-lazy-invent
            class="ui-carousel__gallery__image"
            :alt="item.alt"
            :src="item.src"
            :srcset="item.srcSets"
            :delayLoad="!isFirstImageLoaded && index !== 0"
            sizes="(max-width: 768px) 36.2vw, 90vw"
            @on-image-loaded="onImageLoaded(index)"
            @on-image-error="onImageError(index)"
          ></ui-lazy-invent>
          <div
            v-if="extraContent"
            class="ui-carousel__gallery__item__extra-content label-tag"
          >
            <span class="label-tag__content">{{ extraContent }}</span>
          </div>
          <div class="nav-actions"
               ref="image-actions">
            <slot name='carousel-action' v-bind:index="index"></slot>
          </div>
        </li>
      </ul>
    </div>
    <div
      v-if="extraContent"
      class="ui-carousel__extra-content--mobile label-tag"
    >
      <span class="label-tag__content">{{ extraContent }}</span>
    </div>
    <div class="nav-actions nav-actions--mobile"
         ref="image-actions">
      <slot name='carousel-action' v-bind:index="0"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UiLazyInvent from './ui-lazy-invent.vue'
import { replaceNodeWithErrorImage } from '../tools/errorImage'
interface ImgItem {
  src: string
  srcSets: string
  alt: string
}

export default Vue.extend({
  name: 'UiCarousel',
  data() {
    return {
      isFirstImageLoaded: false,
      isAnyImageLoaded: false
    }
  },
  components: {
    UiLazyInvent
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
  methods: {
    onImageLoaded (index: number): void {
      this.isAnyImageLoaded = true
      if( index===0 ) {
        this.isFirstImageLoaded = true
      }
    },

    onImageError (refIndex: number): void {
      const element = (this.$refs['image-actions'] as HTMLElement[])[refIndex]
      if (element) {
        element.classList.add('nav-actions--error')
      }
    },

    getPosition($event: Event, id: string): void {
      $event.preventDefault()
      this.$emit('on-thumbnail', id)
    }
  }
})
</script>
<style lang="scss" scoped>
.ui-carousel {
  display: flex;
  height: 90vw;
  position: relative;

  &__thumbnails {
    display: none;
  }

  &__gallery {
    $ui-carousel-gallery: &;

    -webkit-transform: translateZ(0); // iOS hack. Don't remove
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scroll-snap-type: x;

    &--active {
      overflow-x: scroll;
    }

    &--one-image {
      overflow-x: hidden;

      #{$ui-carousel-gallery} {
        &__list,
        &__item {
          width: 100%;
        }
      }
    }

    &::-webkit-scrollbar {
      background-color: $background-1;
      display: block;
      height: 2px;
      padding: 0;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $background-3;
      border-radius: 0;
    }

    &__list {
      align-items: flex-start;
      display: flex;
      flex-direction: row;
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__item {
      $item: &;

      align-items: center;
      display: flex;
      justify-content: center;
      margin-bottom: 0;

      & + & {
        margin-left: $spacing-size-2;
      }
    }

    &__image {
      display: flex;
      justify-content: center;
      height: inherit;
      max-width: 100vw;
      min-height: 100%;
      min-width: 100%;
      object-fit: contain;
      width: auto;
    }
  }

  @media (max-width: $breakpoint-s - 1px) {
    /deep/ {
      .placeholder-image {
        height: 100%;
        width: initial;

        svg {
          height: 100%;
        }
      }
    }

    &__gallery {
      @include affrodance-velo;

      &::after {
        display: block;
        height: 100%;
        position: sticky;
        right: initial;
        top: initial;
        width: 100%;
      }

      background-color: #fdfdfd;
      width: 100%;

      &__item {
        $item: &;

        height: 100%;

        &__extra-content,
        .nav-actions {
          display: none;
        }
      }
    }
  }

  @media (min-width: $breakpoint-s) {
    align-items: flex-start;
    background: $white;
    flex-direction: row;
    height: 100%;
    width: 100%;

    /deep/ {
      .placeholder-image {
        width: 100%;

        svg {
          width: 100%;
        }
      }
    }

    &__thumbnails {
      display: block;
      position: sticky;
      top: 0;

      /deep/ {
        .placeholder-image--error {
          font-size: $font-size-7;
        }
      }

      &__item {
        height: auto;
        margin-bottom: $spacing-size-2;
        width: 100%;
      }

      &__image {
        height: auto;
        vertical-align: top;
        width: 100%;
      }
    }

    &__extra-content--mobile,
    .nav-actions--mobile {
      display: none;
    }

    &__gallery {
      /deep/ {
        .placeholder-image--error {
          font-size: $font-size-13;
        }
      }

      &__list {
        flex-direction: column;
        width: 100%;
      }

      &__image {
        display: block;
        width: 100%;
      }

      &__item {
        $item: &;
        @include affrodance-velo;

        margin-bottom: $spacing-size-4;
        position: relative;
        width: 100%;

        & + & {
          margin-left: 0;
        }

        &:nth-child(n + 2) {
          #{$item}__extra-content {
            display: block;
          }
        }
      }
    }
  }
}
</style>
