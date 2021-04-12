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
            :product="products[0]"
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
              :product="products[1]"
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
              :product="products[2]"
              label-text="Producto no disponible"
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
              :product="products[3]"
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
              :product="products[4]"
              @on-click-eye-icon="onClickIcon(products[4].id)"
            />
          </li>
        </ul>
      </div>
    </div>`,
  methods: { onClickIcon: action(`(go to image search) id`) }
})

export const productCardWithSameBrandAndMerchant = () => ({
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
              :product="products[5]"
              @on-click-eye-icon="onClickIcon(products[5].id)"
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
            v-for="(product, index) in (products.length ? products : Array(6).fill({}))"
            :key=index
            class="item col-6--xs col-3--s">
            <ui-product-card
              :product="product"
              @on-click-eye-icon="onClickIcon(product.id)"
            />
          </li>
        </ul>
      </div>
    </div>`,
  methods: { onClickIcon: action(`(go to image search) id`) }
})

export const productCardListSkeleton = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: Array(6).fill(null)
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
              :product="product"
              @on-click-eye-icon="onClickIcon(product.id)"
            />
          </li>
        </ul>
      </div>
    </div>`,
  methods: { onClickIcon: action(`(go to image search) id`) }
})
