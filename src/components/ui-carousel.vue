<template>
  <div class="ui-carousel">
    <h1 class="b2-btn">Aquí irá mi carousel</h1>
    <div class="ui-carousel__container">
      <div>{{ extraContent }}</div>
      <ul class="ui-carousel__list">
        <li
          v-for="(item, index) in items"
          :key="`carousel-${index}`"
          class="ui-carousel__list__item"
        >
          <ui-lazy-image
            class="item-image-container"
            :src="item.src"
            :alt="item.alt"
            :placeholder="placeholderImage"
            :error="errorImage"
          />
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
  }
})
</script>

<style lang="scss" scoped>
.ui-carousel {
  width: auto;
  height: 90vw;
  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  @media (min-width: $breakpoint-xs) {
  }
}
</style>
