<template>
<section class="not-supported">
  <div class="not-supported__container">
    <h1 class="not-supported__title"><img
      src="/svg/logo.svg"
      alt="billionhands"
      class="not-supported__logo"></h1>
    <div class="not-supported__content">
      <h2 class="not-supported__title">Navegador no soportado</h2>
      <p class="not-supported__subtitle">Lo sentimos, tu navegador no sporta billionhands.</p>
      <ul>
        <li class="not-supported__cta"><a
          href="https://www.google.com/intl/es_es/chrome/"
          class="b2-btn b2-btn__highlight not-supported__button"
        >Descargar Google Chrome</a></li>
        <li class="not-supported__cta"><a
          href="https://www.apple.com/es/safari/"
          class="b2-btn b2-btn__highlight not-supported__button"
        >Descargar Safari</a></li>
        <li class="not-supported__cta"><a
          href="https://www.mozilla.org/es-ES/firefox/new/"
          class="b2-btn b2-btn__highlight not-supported__button"
        >Descargar Firefox</a></li>
      </ul>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'no-se-pue'
}
</script>

<style lang="scss">
.not-supported {
  background-color: $black-10;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    max-height: 20rem + $spacing-size-7;
    text-align: center;
  }

  &__logo {
    height: $spacing-size-6;
  }

  &__title {
    @include headers('xxl');

    color: $black-100;
    margin-bottom: $spacing-size-2;
  }

  &__subtitle {
    margin-bottom: $spacing-size-6;
  }

  &__cta {
    & + & {
      margin-top: $spacing-size-2;
    }
  }

  &__button {
    display: block;
  }
}
</style>
