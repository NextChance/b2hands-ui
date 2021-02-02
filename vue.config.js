module.exports = {
  assetsDir: 'assets/',
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/_index.scss";`
      },
      scss: {
        additionalData: `@import "@/assets/scss/_index.scss";`
      }
    }
  }
}
