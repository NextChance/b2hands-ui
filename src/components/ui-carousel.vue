<template>
  <div class="ui-carousel col-container">
    <ul class="ui-carousel__thumbnails col-2--s">
      <li
        v-for="(item, index) in items"
        :key="`carousel-thumbnails-${index}`"
        class="ui-carousel__thumbnails__item"
      >
        <a :href="`#image-${index}`">
          <ui-lazy-invent
            class="ui-carousel__thumbnails__image"
            :alt="`thumbnails-${item.alt}`"
            :src="item.src"
            :srcset="item.srcSets"
          ></ui-lazy-invent>
        </a>
      </li>
    </ul>
    <div
      class="ui-carousel__gallery col-12--xs col-10--s"
      :class="{
        'ui-carousel__gallery--one-image': items.length === 1
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
            <a
              :href="url"
              class="nav-actions__icons"
              @click="handleEyeIcon(index)"
            >
              <i class="b2i-eye"></i>
            </a>
          </div>
        </li>
      </ul>
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
      default: '20%'
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
    handleEyeIcon(imageIndex: number): void {
      this.$emit('on-click-eye-icon', imageIndex)
    },

    onImageError(refIndex: number): void {
      (this.$refs['image-actions'] as HTMLElement[])[refIndex].classList.add('nav-actions--error')
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
    $uiCarouselGallery: &;
    height: 100%;
    scroll-behavior: smooth;
    scroll-snap-type: x;
    overflow-x: scroll;
    overflow-y: hidden;

    &--one-image {
      overflow-x: hidden;

      #{$uiCarouselGallery} {
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
      padding: 0;
      margin: 0;
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
      height: inherit;
      max-width: 100vw;
      min-width: 100%;
      min-height: 100%;
      object-fit: contain;
      width: auto;
    }
  }

  @media (max-width: $breakpoint-s - 1px) {
    /deep/ {
      .placeholder-image {
        height: 100%;
        svg {
          height: 100%;
        }
      }
    }

    &__gallery {
      @include affrodance-velo;
      width: 100%;
      background-color: #FDFDFD;

      &__item {
        $item: &;
        height: 100%;

        &:nth-child(n + 2) {
          #{$item}__extra-content,
          .nav-actions {
            display: none;
          }
        }
      }
    }
  }

  @media (min-width: $breakpoint-s) {
    align-items: flex-start;
    flex-direction: row;
    height: 100%;
    width: 100%;
    background: $white;

    /deep/ {
      .placeholder-image {
        width: 100%;
        svg {
          width: 100%;
        }
      }
    }

    &__thumbnails {
      position: sticky;
      display: block;
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
