<template>
  <div class="ui-carousel">
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
      class="ui-carousel__images col-10--s"
      :class="{ 'ui-carousel__images--no-scroll': items.length === 1 }"
    >
      <ul v-if="items.length > 1" class="ui-carousel__images__list">
        <li
          v-for="(item, index) in items"
          :key="`carousel-${index}`"
          class="ui-carousel__images__item"
        >
          <ui-lazy-image
            :id="`image-${index}`"
            class="item-image-container"
            :src="item.src"
            :alt="item.alt"
            :placeholder="placeholderImage"
            :error="errorImage"
          />
          <div class="ui-carousel__images__item__extra-content">
            <span class="type-label">{{ extraContent }}</span>
          </div>
          <div class="ui-carousel__images__item__icons">
            <a :href="url" class="icon-link" @click="handleEyeIcon($event)">
              <i class="b2i-eye"></i>
            </a>
          </div>
        </li>
      </ul>
      <ui-lazy-image
        v-else
        class="item-image-container item-image-container--one-image"
        :src="items[0].src"
        :alt="items[0].alt"
        :placeholder="placeholderImage"
        :error="errorImage"
      />
    </div>
    <div class="ui-carousel__extra-content-common">
      <span class="type-label">{{ extraContent }}</span>
    </div>
    <div class="ui-carousel__icons-common">
      <a :href="url" class="icon-link" @click="handleEyeIcon($event)">
        <i class="b2i-eye"></i>
      </a>
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
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    handleEyeIcon(ev: Event) {
      ev.preventDefault()
      this.$emit('on-click-eye-icon')
    }
  }
})
</script>

<style lang="scss" scoped>
/deep/ {
  .ui-lazy-image__image {
    max-width: 100vw;
    max-height: 90vw;
    height: auto;
    width: auto;
  }
}
@mixin extra-content-label {
  position: absolute;
  top: 2px;
  right: 0;
  z-index: 1;
  font-size: 12px;
  .type-label {
    width: auto;
    box-sizing: border-box;
    height: 20px;
    padding: 2px 8px;
    background-color: $background-inverse;
    color: $content-inverse;
  }
}
@mixin icons-buttons {
  position: absolute;
  bottom: 8px;
  left: 8px;
  .icon-link {
    color: $black-100;
    text-decoration: none;
    display: block;
    text-align: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: $background-1;
    font-size: 23px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  }
}
.ui-carousel {
  width: 100%;
  height: 90vw;
  position: relative;
  display: flex;
  &__thumbnails {
    display: none;
    list-style: none;
    margin: 0 16px 0 0;
    padding: 0;
  }
  &__images {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    scroll-snap-type: x;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-behavior: smooth;
    &--no-scroll {
      overflow-x: hidden;
    }
    &::-webkit-scrollbar {
      display: block;
      height: 2px;
      padding: 3px 0 0 0;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 0;
      background-color: $background-3;
    }
    &__list {
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }
    &__item {
      height: 100%;
      margin-bottom: 0;
      margin-right: 8px;
      &__extra-content {
        display: none;
      }
      &__icons {
        display: none;
      }
    }
    .item-image-container {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: center;
      &--one-image {
        justify-content: center;
        align-items: center;
      }
    }
  }
  &__extra-content-common {
    @include extra-content-label;
  }
  &__icons-common {
    @include icons-buttons;
  }

  @media (min-width: $breakpoint-s) {
    /deep/ {
      .ui-lazy-image__image {
        max-height: unset;
        max-width: unset;
        width: 100%;
        height: 100%;
      }
    }
    height: 100%;
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    &__thumbnails {
      display: block;
      &__item {
        width: 100%;
        height: auto;
        margin-bottom: 8px;
      }
      .item-image {
        width: 100%;
        height: auto;
        vertical-align: top;
      }
    }
    &__images {
      &__list {
        flex-direction: column;
        .item-image-container {
          flex-direction: column;
          width: 100%;
          height: auto;
        }
      }

      &__item {
        position: relative;
        margin-bottom: 16px;
        &__extra-content {
          display: block;
          @include extra-content-label;
        }
        &__icons {
          display: block;
          @include icons-buttons;
        }
      }
    }
    &__extra-content-common {
      display: none;
    }
    &__icons-common {
      display: none;
    }
  }
}
</style>
