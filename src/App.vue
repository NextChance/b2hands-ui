<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    Bartolo
    <i class="b2i-filters"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  color: #2c3e50;
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  text-align: center;
}
</style>
