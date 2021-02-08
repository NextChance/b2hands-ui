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
            :alt="`thumbnails-${item.alt}`"
            :placeholder="placeholderImage"
          />
        </a>
      </li>
    </ul>
    <div
      class="ui-carousel__images-container col-10--s"
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
            class="ui-carousel__images-container__item__extra-content"
          >
            <span class="type-label">{{ extraContent }}</span>
          </div>
          <div class="ui-carousel__images-container__item__icons">
            <a :href="url" class="icon-link" @click="handleEyeIcon($event)">
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
  width: 100%;
  &__thumbnails {
    display: none;
    list-style: none;
    margin-top: 0;
    padding: 0;
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
    @include affrodance-velo;
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
      height: 100%;
      margin-bottom: 0;
      & + & {
        margin-left: $spacing-size-2;
      }
      &__extra-content {
        font-size: $font-size-2;
        position: absolute;
        right: 0;
        top: 2px;
        z-index: map-get($zindex, affrondance-velo);
        .type-label {
          background-color: $background-inverse;
          box-sizing: border-box;
          color: $content-inverse;
          height: $spacing-size-5;
          padding: 2px $spacing-size-2;
          width: auto;
        }
      }
      &__icons {
        bottom: $spacing-size-2;
        left: $spacing-size-2;
        position: absolute;
        z-index: map-get($zindex, carousel-icons);
        .icon-link {
          background: $background-1;
          border-radius: 50%;
          box-shadow: 0px $spacing-size-1 $spacing-size-1 rgba(0, 0, 0, 0.05);
          color: $black-100;
          display: block;
          font-size: $font-size-7;
          height: $spacing-size-7;
          text-decoration: none;
          text-align: center;
          width: $spacing-size-7;
          &:hover {
            color: $black-80;
          }
        }
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
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: center;
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
      @include affrodance-velo-reset;
      &__list {
        flex-direction: column;
        .item-image-container {
          flex-direction: column;
          height: auto;
          width: 100%;
          @include affrodance-velo;
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
