const path = require('path')
module.exports = {
  assetsDir: 'assets/',
  publicPath: '/',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/_index.scss";`,
        hoistUseStatements: true
      },
      scss: {
        additionalData: `@import "@/assets/scss/_index.scss";`,
        hoistUseStatements: true
      }
    }
  }
}
