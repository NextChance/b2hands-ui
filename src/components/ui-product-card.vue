<template>
  <div
    class="ui-product-card"
    :class="{
      'ui-product-card--skeleton': !product,
      'ui-product-card--with-cover-link': href
    }"
    :to="href || ''"
  >
    <a
      v-if="href"
      :href="href"
      class="ui-product-card__cover-link"
    ></a>
    <div class="ui-product-card__media">
      <ui-lazy-invent
        class="ui-product-card__media__image-container"
        :src="firstImage.src"
        :srcset="firstImage.srcSets"
        :alt="firstImage.alt"
        @on-image-error="onImageError(`nav-actions`)"
      />
      <div
        v-if="labelText || (product && product.discountPercentage > 0)"
        class="label-tag"
      >
        <span class="label-tag__content">{{ labelText || discountPercentage }}</span>
      </div>
      <div
        :ref="`nav-actions`"
        class="nav-actions"
      >
        <a
          :href="eyeUrl"
          class="nav-actions__icons"
          @click="handleEyeIcon($event)"
        >
          <i class="b2i-eye"></i>
        </a>
      </div>
    </div>
    <div class="ui-product-card__info">
      <div class="ui-product-card__info__title">{{ product && product.name }}
      </div>
      <div class="ui-product-card__info__complementary">
        <span class="merchant">{{ product && product.merchantName }}</span>
        <span
          v-if="product && product.brand && product.merchantName !== product.brand"
          class="brand"> - {{ product.brand }}</span>
      </div>
      <div class="ui-product-card__info__complementary">
        <span v-if="product && product.fullPrice && product.salePrice !== product.fullPrice"
              class="full-price">{{ product.fullPrice }}</span>
        <span class="final-price">{{ product && product.salePrice }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import UiLazyInvent from './ui-lazy-invent.vue'
import Image from '../types/Image'
import AnyObject from '../types/AnyObject'
import { Product } from '../types/Product'

export default Vue.extend({
  name: 'UiProductCard',
  components: {
    UiLazyInvent
  },
  props: {
    href: {
      type: String,
      default: ''
    },
    product: {
      type: Object as () => Product,
      default: {}
    },
    labelText: {
      type: String,
      default: ''
    },
    eyeUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    firstImage (): Image | AnyObject {
      return (
        (this.product && this.product.images && this.product.images[0]) || {}
      )
    },
    discountPercentage (): string {
      return this.product?.discountPercentage
        ? `${(this.product.discountPercentage * 100).toFixed(0)}%`
        : ''
    }
  },
  methods: {
    handleEyeIcon (ev: Event): void {
      this.$emit('on-click-eye-icon')
    },

    onImageError (refName: string): void {
      const element = this.$refs[refName] as HTMLElement
      element.classList.add('nav-actions--error')
    }
  }
})
</script>
<style lang="scss" scoped>
.ui-product-card {
  $ui-product-card: &;

  display: block;
  width: 100%;

  &__media {
    @include affrodance-velo;

    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  &__info {
    padding: $spacing-size-2;

    &__title {
      @include body('s');
      @include ellipsis(2);

      color: $content-1;
      max-height: $spacing-size-7;
    }

    &__complementary {
      .merchant,
      .brand {
        @include detail('upper');

        color: $content-3;
      }

      .full-price {
        @include detail('strike');

        color: $content-3;
      }

      .final-price {
        @include headers('s');

        color: $content-1;
      }
    }
  }

  &--with-cover-link {
    position: relative;

    #{$ui-product-card}__media {
      pointer-events: none;

      /deep/ .nav-actions {
        &, &__icons {
          pointer-events: all;
        }
      }
    }
  }

  &__cover-link {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  &--skeleton {
    #{$ui-product-card}__media {
      @include affrodance-velo-reset;
      @include text-skeleton;
    }

    .nav-actions {
      display: none;
    }
    #{$ui-product-card}__info {
      &__title {
        @include text-skeleton;
      }

      &__complementary {
        @include text-skeleton;

        height: $spacing-size-3;
        width: 72px;

        &:last-child {
          width: 48px;
        }
      }
    }
  }
}
</style>
