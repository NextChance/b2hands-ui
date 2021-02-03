<template>
  <div class="ui-carousel">
    <h1 class="b2-btn">Aquí irá mi carousel</h1>
    <div class="ui-carousel__container">
      <ul class="ui-carousel__list">
        <li
          v-for="(image, index) in images"
          :key="`carousel-${index}`"
          class="ui-carousel__list__item"
        >
          <ui-lazy-image
            class="item-image-container"
            :src="item.image.src"
            :alt="item.image.alt"
            :placeholder="placeholderImage"
            :error="errorImage"
            :src-sets="srcSets"
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
import UiLazyImage from '.ui-lazy-image.vue'
export default Vue.extend({
  name: 'UiCarousel',
  components: {
    UiLazyImage
  },
  props: {
    items: {
      type: Array,
      default: (): Array<ImgItem> => []
    }
  }
})
</script>

<style lang="scss" scoped>
.ui-carousel {
  width: auto;
  height: 90vw;
  background-color: red;
  @media (min-width: $breakpoint-xs) {
    background-color: blue;
  }
}
</style>
