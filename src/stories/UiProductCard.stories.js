/* eslint-disable @typescript-eslint/explicit-function-return-type */
import UiProductCard from '~/components/ui-product-card'

export default {
  title: 'UI-product-card',
  component: UiProductCard
}

const productsMocks = [
  {
    alt: 'Imagen de ramos de flores',
    brand: 'Cañete',
    error: '',
    finalPrice: '59,3€',
    fullPrice: '65,89€',
    labelText: '10%',
    merchant: 'outlet-textil',
    src:
      'https://media.kavehome.com/media/cache/65/22/65221deb42f3b30886e4ab7f710ef284.jpg',
    title: 'Colcha silas',
    url: ''
  },
  {
    alt: 'Imagen de ramos de flores',
    brand: 'Cañete',
    error: '',
    finalPrice: '59,3€',
    fullPrice: '65,89€',
    labelText: '10%',
    merchant: 'outlet-textil',
    src:
      'https://media-esp-buyviu-com.s3.amazonaws.com/products/27bcbc75071ca1c45ee7b4b31a718d1d_image_1.jpg',
    title:
      'Caso de título con más de dos líneas. Caso de título con más de dos líneas. Caso de título con más de dos líneas. Caso de título con más de dos líneas.',
    url: ''
  },
  {
    alt: 'Imagen de ramos de flores',
    brand: 'Cañete',
    error: '',
    finalPrice: '59,3€',
    fullPrice: '65,89€',
    labelText: 'No disponible',
    merchant: 'outlet-textil',
    src:
      'https://media-esp-buyviu-com.s3.amazonaws.com/products/27bcbc75071ca1c45ee7b4b31a718d1d_image_1.jpg',
    title: 'Caso de producto no disponible',
    url: ''
  },
  {
    alt: 'Imagen de ramos de flores',
    brand: 'Cañete',
    error: '',
    finalPrice: '65,89€',
    merchant: 'outlet-textil',
    src:
      'https://media-esp-buyviu-com.s3.amazonaws.com/products/27bcbc75071ca1c45ee7b4b31a718d1d_image_1.jpg',
    title: 'Caso de producto sin descuento',
    url: ''
  }
]

export const productCardBasic = () => ({
  components: { UiProductCard },
  data() {
    return {
      src:
        'https://media-esp-buyviu-com.s3.amazonaws.com/products/27bcbc75071ca1c45ee7b4b31a718d1d_image_1.jpg',
      alt: 'ramos de flores',
      error: '',
      url: '',
      labelText: '10%',
      title: 'Colcha silas',
      brand: 'Cañete',
      merchant: 'outlet-textil',
      finalPrice: '59,3€',
      fullPrice: '65,89€'
    }
  },
  template: `
    <div class="col-container">
      <div class="col-12--xs col-12--s">
        <ul class="col-container">
          <li class="col-2--xs col-3--s">
            <ui-product-card
              :src="src"
              :alt="alt"
              :url="url"
              :label-text="labelText"
              :title="title"
              :brand="brand"
              :merchant="merchant"
              :final-price="finalPrice"
              :full-price="fullPrice"
            />
          </li>
        </ul>
      </div>
    </div>`
})

export const productCardTitleWithTwoLines = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: productsMocks
    }
  },
  template: `
    <div class="col-container">
      <div class="col-12--xs col-12--s">
        <ul class="col-container">
          <li
            class="col-2--xs col-3--s">
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
            />
          </li>
        </ul>
      </div>
    </div>`
})

export const productCardNotAvailable = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: productsMocks
    }
  },
  template: `
    <div class="col-container">
      <div class="col-12--xs col-12--s">
        <ul class="col-container">
          <li
            class="col-2--xs col-3--s">
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
            />
          </li>
        </ul>
      </div>
    </div>`
})

export const productCardWithoutDiscount = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: productsMocks
    }
  },
  template: `
    <div class="col-container">
      <div class="col-12--xs col-12--s">
        <ul class="col-container">
          <li
            class="col-2--xs col-3--s">
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
            />
          </li>
        </ul>
      </div>
    </div>`
})

export const productCardWithoutBrand = () => ({
  components: { UiProductCard },
  data() {
    return {
      products: productsMocks
    }
  },
  template: `
    <div class="col-container">
      <div class="col-12--xs col-12--s">
        <ul class="col-container">
          <li
            class="col-2--xs col-3--s">
            <ui-product-card
              :src="products[3].src"
              :alt="products[3].alt"
              :url="products[3].url"
              :label-text="products[3].labelText"
              :title="products[3].title"
              :merchant="products[3].merchant"
              :final-price="products[3].finalPrice"
              :full-price="products[3].fullPrice"
            />
          </li>
        </ul>
      </div>
    </div>`
})

export const productCardList = () => ({
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
            />
          </li>
        </ul>
      </div>

    </div>`
})
