/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { action } from '@storybook/addon-actions'
import UiProductCard from '~/components/ui-product-card'
import { productsMocks } from '~/fixtures/ui-product-card.fixture.js'

export default {
  title: 'UI-product-card',
  component: UiProductCard
}

export const productCardBasic = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: productsMocks
    }
  },
  template: `
  <div class="story-product-card-containers">
    <div class="story-product-card">
      <ul class="list col-container">
        <li class="item col-6--xs col-4--s col-3--m">
          <ui-product-card
            :src="products[0].src"
            :srcSet="products[0].srcSet"
            :alt="products[0].alt"
            :url="products[0].url"
            :label-text="products[0].labelText"
            :title="products[0].title"
            :brand="products[0].brand"
            :merchant="products[0].merchant"
            :final-price="products[0].finalPrice"
            :full-price="products[0].fullPrice"
            :id="products[0].id"
            @on-click-eye-icon="onClickIcon(products[0].id)"
          />
        </li>
      </ul>
    </div>
  </div>`,
  methods: { onClickIcon: action(`(go to image search) id`) }
})

export const productCardTitleWithTwoLines = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: productsMocks
    }
  },
  template: `
    <div class="story-product-card-containers">
      <div class="story-product-card">
        <ul class="list col-container">
          <li class="item col-6--xs col-4--s col-3--m">
            <ui-product-card
              :src="products[1].src"
              :alt="products[1].alt"
              :url="products[1].url"
              :label-text="products[1].labelText"
              :title="products[1].title"
              :brand="products[1].brand"
              :merchant="products[1].merchant"
              :final-price="products[1].finalPrice"
              :full-price="products[1].fullPrice"
              :id="products[1].id"
              @on-click-eye-icon="onClickIcon(products[1].id)"
            />
          </li>
        </ul>
      </div>
    </div>`,
  methods: { onClickIcon: action(`(go to image search) id`) }
})

export const productCardNotAvailable = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: productsMocks
    }
  },
  template: `
    <div class="story-product-card-containers">
      <div class="story-product-card">
        <ul class="list col-container">
          <li class="item col-6--xs col-4--s col-3--m">
            <ui-product-card
              :src="products[2].src"
              :alt="products[2].alt"
              :url="products[2].url"
              :label-text="products[2].labelText"
              :title="products[2].title"
              :brand="products[2].brand"
              :merchant="products[2].merchant"
              :final-price="products[2].finalPrice"
              :full-price="products[2].fullPrice"
              :id="products[2].id"
              @on-click-eye-icon="onClickIcon(products[2].id)"
            />
          </li>
        </ul>
      </div>
    </div>`,
   methods: { onClickIcon: action(`(go to image search) id`) }
})

export const productCardWithoutDiscount = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: productsMocks
    }
  },
  template: `
    <div class="story-product-card-containers">
      <div class="story-product-card">
        <ul class="list col-container">
          <li class="item col-6--xs col-4--s col-3--m">
            <ui-product-card
              :src="products[3].src"
              :alt="products[3].alt"
              :url="products[3].url"
              :label-text="products[3].labelText"
              :title="products[3].title"
              :brand="products[3].brand"
              :merchant="products[3].merchant"
              :final-price="products[3].finalPrice"
              :full-price="products[3].fullPrice"
              :id="products[3].id"
              @on-click-eye-icon="onClickIcon(products[3].id)"
            />
          </li>
        </ul>
      </div>
    </div>`,
  methods: { onClickIcon: action(`(go to image search) id`) }
})

export const productCardWithoutBrandAndImageError = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: productsMocks
    }
  },
  template: `
    <div class="story-product-card-containers">
      <div class="story-product-card">
        <ul class="list col-container">
          <li class="item col-6--xs col-4--s col-3--m">
            <ui-product-card
              :src="products[4].src"
              :alt="products[4].alt"
              :url="products[4].url"
              :label-text="products[4].labelText"
              :title="products[4].title"
              :brand="products[4].brand"
              :merchant="products[4].merchant"
              :final-price="products[4].finalPrice"
              :full-price="products[4].fullPrice"
              :id="products[4].id"
              @on-click-eye-icon="onClickIcon(products[4].id)"
            />
          </li>
        </ul>
      </div>
    </div>`,
    methods: { onClickIcon: action(`(go to image search) id`) }
})

export const productCardList = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: productsMocks
    }
  },
  template: `
    <div class="story-product-card-containers story-product-card-containers--list">
      <div class="story-product-card">
        <ul class="list col-container">
          <li
            v-for="(product, index) in products"
            :key=index
            class="item col-6--xs col-3--s">
            <ui-product-card
              :src="product.src"
              :alt="product.alt"
              :url="product.url"
              :label-text="product.labelText"
              :title="product.title"
              :brand="product.brand"
              :merchant="product.merchant"
              :final-price="product.finalPrice"
              :full-price="product.fullPrice"
              :id="product.id"
              @on-click-eye-icon="onClickIcon(product.id)"
            />
          </li>
        </ul>
      </div>
    </div>`,
  methods: { onClickIcon: action(`(go to image search) id`) }
})
