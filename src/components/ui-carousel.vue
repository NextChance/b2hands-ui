<template>
  <div class="ui-carousel col-container">
    <ul class="ui-carousel__thumbnails col-2--s">
      <li
        v-for="(item, index) in items"
        :key="`carousel-thumbnails-${index}`"
        class="ui-carousel__thumbnails__item"
      >
        <a :href="`#image-${index}`">
          <img
            class="item-image"
            :src="item.src"
            :src-sets="item.srcSets"
            :alt="`thumbnails-${item.alt}`"
            :placeholder="placeholderImage"
          />
        </a>
      </li>
    </ul>
    <div
      class="ui-carousel__images-container col-12--s col-10--s"
      :class="{
        'ui-carousel__images-container--one-image': items.length === 1
      }"
    >
      <ul class="ui-carousel__images-container__list">
        <li
          v-for="(item, index) in items"
          :key="`carousel-${index}`"
          class="ui-carousel__images-container__item"
        >
          <ui-lazy-image
            :id="`image-${index}`"
            class="item-image-container"
            :src="item.src"
            :alt="item.alt"
            :placeholder="placeholderImage"
            :error="errorImage"
          />
          <div
            v-if="extraContent"
            class="ui-carousel__images-container__item__extra-content label-tag"
          >
            <span class="label-tag__content">{{ extraContent }}</span>
          </div>
          <div class="nav-actions">
            <a
              :href="url"
              class="nav-actions__icons"
              @click="handleEyeIcon($event)"
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
interface ImgItem {
  src: string
  srcSets: string
  alt: string
}

import UiLazyImage from './ui-lazy-image.vue'
export default Vue.extend({
  name: 'UiCarousel',
  components: {
    UiLazyImage
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
    handleEyeIcon(ev: Event): void {
      ev.preventDefault()
      this.$emit('on-click-eye-icon')
    }
  }
})
</script>
<style lang="scss" scoped>
/deep/ {
  .ui-lazy-image__image {
    height: auto;
    max-height: 90vw;
    max-width: 100vw;
    width: auto;
  }
}
.ui-carousel {
  display: flex;
  height: 90vw;
  position: relative;
  background: $black-10;
  &__thumbnails {
    display: none;
  }
  &__images-container {
    $uiCarouselImages: &;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    justify-content: space-between;
    scroll-behavior: smooth;
    scroll-snap-type: x;
    overflow-x: scroll;
    overflow-y: hidden;
    width: 100%;
    &--one-image {
      overflow-x: hidden;
      #{$uiCarouselImages} {
        &__list,
        &__item {
          width: 100%;
        }
      }
      .item-image-container {
        align-items: center;
        display: flex;
        justify-content: center;
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
      height: 100%;
      justify-content: center;
      margin-bottom: 0;
      width: 100%;
      & + & {
        margin-left: $spacing-size-2;
      }
      &:nth-child(n + 2) {
        #{$item}__extra-content {
          display: none;
        }
        #{$item}__icons {
          display: none;
        }
      }
    }
    .item-image-container {
      height: auto;
    }
  }

  @media (min-width: $breakpoint-s) {
    /deep/ {
      .ui-lazy-image__image {
        height: 100%;
        max-height: unset;
        max-width: unset;
        width: 100%;
      }
    }
    align-items: flex-start;
    flex-direction: row;
    height: 100%;
    width: 100%;
    background: $white;
    &__thumbnails {
      position: sticky;
      display: block;
      top: 0;
      &__item {
        height: auto;
        margin-bottom: $spacing-size-2;
        width: 100%;
      }
      .item-image {
        height: auto;
        vertical-align: top;
        width: 100%;
      }
    }
    &__images-container {
      &__list {
        flex-direction: column;
        width: 100%;
        .item-image-container {
          flex-direction: column;
          height: auto;
          width: 100%;
        }
      }

      &__item {
        $item: &;
        margin-bottom: $spacing-size-4;
        position: relative;
        & + & {
          margin-left: 0;
        }
        &:nth-child(n + 2) {
          #{$item}__extra-content {
            display: block;
          }
          #{$item}__icons {
            display: block;
          }
        }
      }
    }
  }
}
</style>
