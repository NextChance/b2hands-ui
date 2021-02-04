<template>
  <div class="ui-carousel">
    <ul class="ui-carousel__thumbnails col-2--s">
      <li
        v-for="(item, index) in items"
        :key="`carousel-thumbnails-${index}`"
        class="ui-carousel__thumbnails__item"
      >
        <img
          class="item-image"
          :src="item.src"
          :alt="`thumbnails-${item.alt}`"
          :placeholder="placeholderImage"
        />
      </li>
    </ul>
    <div class="ui-carousel__images col-10--s">
      <ul class="ui-carousel__images__list">
        <li
          v-for="(item, index) in items"
          :key="`carousel-${index}`"
          class="ui-carousel__images__item"
        >
          <ui-lazy-image
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
            <button
              type="button"
              class="icon-button"
              @click="handleEyeIcon(index)"
            >
              <i class="b2i-eye"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="ui-carousel__extra-content">
      <span class="type-label">{{ extraContent }}</span>
    </div>
    <div class="ui-carousel__icons">
      <button type="button" class="icon-button" @click="handleEyeIcon(index)">
        <i class="b2i-eye"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface ImgItem {
  src: string
  alt: string
}
import UiLazyImage from '~/components/ui-lazy-image.vue'
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
    handleEyeIcon(index: number): void {
      this.$emit('on-click-eye-icon', index)
    }
  }
})
</script>

<style lang="scss" scoped>
/deep/ {
  .ui-lazy-image__image {
    max-width: 100vw;
    max-height: 100%;
    width: auto;
    height: auto;
    border: 1px solid yellow;
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
  .icon-button {
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: $background-1;
    font-size: 23px;
    padding: 4px 2px;
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
    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
    }
    &__item {
      border: 1px solid green;
      margin-right: 8px;
      //width: auto;
      &__extra-content {
        display: none;
      }
      &__icons {
        display: none;
      }
    }
    .item-image-container {
      border: 1px solid blue;
      display: flex;
      align-items: center;
      //width: fit-content;
    }
  }
  &__extra-content {
    @include extra-content-label;
  }
  &__icons {
    @include icons-buttons;
  }

  @media (min-width: $breakpoint-s) {
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
          @include extra-content-label;
        }
        &__icons {
          @include icons-buttons;
        }
      }

      &__extra-content {
        display: none;
      }
    }
  }
}
</style>
