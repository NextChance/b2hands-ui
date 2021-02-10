/* eslint-disable @typescript-eslint/explicit-function-return-type */
import UiProductCard from '~/components/ui-product-card'

export default {
  title: 'UI-product-card',
  component: UiProductCard
}

const productsMocks = [
  {
    alt: 'Imagen de lampara',
    brand: 'Cañete',
    error: '',
    finalPrice: '59,3€',
    fullPrice: '65,89€',
    labelText: '10%',
    merchant: 'outlet-textil',
    src:
      'https://media.kavehome.com/media/cache/65/22/65221deb42f3b30886e4ab7f710ef284.jpg',
    title: 'lampara silas',
    url: ''
  },
  {
    alt: 'Imagen de cama',
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
    alt: 'Imagen habitación',
    brand: 'Cañete',
    error: '',
    finalPrice: '59,3€',
    fullPrice: '65,89€',
    labelText: 'No disponible',
    merchant: 'outlet-textil',
    src:
      'https://previews.123rf.com/images/kuprin28/kuprin281511/kuprin28151101312/47622146-vista-panor%C3%A1mica-en-el-estudio-moderno-las-paredes-blancas-y-muebles-de-color-marr%C3%B3n-y-gris-mezclado-piso.jpg',
    title: 'Caso de producto no disponible',
    url: ''
  },
  {
    alt: 'Imagen de cuadro',
    brand: 'Cañete',
    error: '',
    finalPrice: '65,89€',
    merchant: 'outlet-textil',
    src:
      'https://c8.alamy.com/compes/g75gjf/vista-panoramica-vertical-de-one-world-trade-center-rascacielos-al-atardecer-lower-manhattan-el-distrito-financiero-de-la-ciudad-de-nueva-york-g75gjf.jpg',
    title: 'Caso de producto sin descuento e imagen muy alta recortada',
    url: ''
  },
  {
    alt: 'Imagen de cuadro',
    brand: '',
    error: '',
    finalPrice: '65,89€',
    fullPrice: '65,89€',
    merchant: 'outlet-textil',
    src:
      'https://media-esp-buyviu-com.s3.amazonaws.com/products/27bcbc75071ca1c45ee7b4b31a718d1d_image_1.jpg',
    title: 'Caso de producto sin brand',
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
              :src="products[4].src"
              :alt="products[4].alt"
              :url="products[4].url"
              :label-text="products[4].labelText"
              :title="products[4].title"
              :brand="products[4].brand"
              :merchant="products[4].merchant"
              :final-price="products[4].finalPrice"
              :full-price="products[4].fullPrice"
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

