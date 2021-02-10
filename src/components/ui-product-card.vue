<template>
  <div class="ui-product-card">
    <div class="ui-product-card__media">
      <!-- Replace for ui-lazy-image -->
      <div class="ui-product-card__media__image-container">
        <img
          class="ui-lazy-image__image"
          :src="src"
          :alt="alt"
          :error="error"
        />
      </div>
      <!-- /Replace for ui-lazy-image -->
      <div v-if="labelText" class="ui-product-card__media__label">
        <span class="label-content">{{ labelText }}</span>
      </div>
      <div class="ui-product-card__media__icons">
        <a :href="url" class="icons-content" @click="handleEyeIcon($event)">
          <i class="b2i-eye"></i>
        </a>
      </div>
    </div>
    <div class="ui-product-card__info">
      <div class="ui-product-card__info__title">
        {{ title }}
      </div>
      <div class="ui-product-card__info__complementary">
        <span class="merchant">{{ merchant }}</span>
        <span v-if="brand" class="brand">{{ brand }} </span>
      </div>
      <div class="ui-product-card__info__complementary">
        <span v-if="fullPrice" class="full-price">{{ fullPrice }}</span>
        <span class="final-price">{{ finalPrice }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UiProductCard',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    labelText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    brand: {
      type: String,
      default: ''
    },
    merchant: {
      type: String,
      default: ''
    },
    finalPrice: {
      type: String,
      default: ''
    },
    fullPrice: {
      type: String,
      default: ''
    }
  }
})
</script>
<style lang="scss" scoped>
.ui-product-card {
  width: 100%;
  &__media {
    position: relative;
    width: 100%;
    &__image-container {
      align-items: center;
      display: flex;
      justify-content: center;
      height: 100%;
      width: 100%;
      img {
        height: auto;
        width: 100%;
      }
    }
    /* pasar a un mixin genérico para usar en la app*/
    &__label {
      font-size: $font-size-2;
      position: absolute;
      right: 0;
      top: 2px;
      z-index: 2;
      .label-content {
        background-color: $background-inverse;
        box-sizing: border-box;
        color: $content-inverse;
        height: $spacing-size-5;
        padding: 2px $spacing-size-2;
        width: auto;
      }
    }
    /* pasar a un mixin genérico para usar en la app*/
    &__icons {
      bottom: $spacing-size-2;
      left: $spacing-size-2;
      position: absolute;
      z-index: 3;
      .icons-content {
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
  }
  &__info {
    padding: $spacing-size-1;
    &__title {
      color: $content-1;
      @include body('s');
      @include ellipsis(2);
    }
    &__complementary {
      .merchant,
      .brand {
        color: $content-3;
        @include detail('upper');
      }
      .full-price {
        color: $content-3;
        @include detail('strike');
      }
      .final-price {
        color: $content-1;
        @include headers('s');
      }
    }
  }
}
</style>
