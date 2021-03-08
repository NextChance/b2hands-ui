<template>
  <div class="ui-product-card">
    <div class="ui-product-card__media">
      <ui-lazy-invent
        class="ui-product-card__media__image-container"
        :src="product.src"
        :srcset="product.srcset"
        :alt="product.alt"
        @on-image-error="onImageError(`nav-actions`)"
      />
      <div v-if="product.labelText" class="label-tag">
        <span class="label-tag__content">{{ product.labelText }}</span>
      </div>
      <div
        class="nav-actions"
        :ref="`nav-actions`"
      >
        <a
          :href="product.url"
          class="nav-actions__icons"
          @click.prevent.stop="handleEyeIcon($event)"
        >
          <i class="b2i-eye"></i>
        </a>
      </div>
    </div>
    <div class="ui-product-card__info">
      <div class="ui-product-card__info__title">
        {{ product.title }}
      </div>
      <div class="ui-product-card__info__complementary">
        <span class="merchant">{{ product.merchant }}</span>
        <span v-if="product.brand" class="brand">{{ product.brand }} </span>
      </div>
      <div class="ui-product-card__info__complementary">
        <span v-if="product.fullPrice" class="full-price">{{ product.fullPrice }}</span>
        <span class="final-price">{{ product.finalPrice }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import UiLazyInvent from './ui-lazy-invent.vue'
import { Product } from '../types/Product'

export default Vue.extend({
  name: 'UiProductCard',
  components: {
    UiLazyInvent
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      default: {}
    }
  },
  methods: {
    handleEyeIcon(ev: Event): void {
      this.$emit('on-click-eye-icon')
    },

    onImageError(refName: string): void {
      (this.$refs[refName] as HTMLElement).classList.add('nav-actions--error')
    }
  }
})
</script>
<style lang="scss" scoped>
.ui-product-card {
  width: 100%;

  &__media {
    @include affrodance-velo;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: 100%;
    &__image-container {
    }
  }
  &__info {
    padding: $spacing-size-2;

    &__title {
      color: $content-1;
      height: $spacing-size-7;
      @include body('s');
      @include ellipsis(2);
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
}
</style>
