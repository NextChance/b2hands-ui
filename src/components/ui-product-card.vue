<template>
  <div class="ui-product-card">
    <div class="ui-product-card__media">
      <ui-lazy-invent
        class="ui-product-card__media__image-container"
        :src="src"
        :srcset="srcset"
        :alt="alt"
      />
      <div v-if="labelText" class="label-tag">
        <span class="label-tag__content">{{ labelText }}</span>
      </div>
      <div class="nav-actions">
        <a
          :href="url"
          class="nav-actions__icons"
          @click.prevent.stop="handleEyeIcon($event)"
        >
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
import UiLazyInvent from './ui-lazy-invent.vue'
export default Vue.extend({
  name: 'UiProductCard',
  components: {
    UiLazyInvent
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    srcset: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    placeholderImage: {
      type: String,
      default: ''
    },
    errorImage: {
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
  },
  methods: {
    handleEyeIcon(ev: Event): void {
      this.$emit('on-click-eye-icon')
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
