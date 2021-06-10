const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '~assets': path.join(__dirname, './src/assets')
      }
    }
  },
  devServer: {
    port: 3000,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: true
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/dhcp-dns-lab/' : '/'
}
