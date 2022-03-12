const path = require('path')

module.exports = {
  publicPath: './',
  productionSourceMap: false, // 是否生产sourceMap
  outputDir: 'dist/www', // 生成的生产环境
  devServer: {
    open: true,
    https: false,
    port: 8081,
    host: '0.0.0.0'
  },
  // eslint取消
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },
  css: {
    loaderOptions: {
      css: {},
      sass: {
        prependData: '@import "@/assets/css/sass/index.scss";' // sass-loader@7 以上版本需要用 prependData
      }
    }
  }
}
