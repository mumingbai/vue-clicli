const webpack = require('webpack')
const merge = require('webpack-merge')

const VueClientPlugin = require('vue-server-renderer/client-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const baseConfig = require('./wp.base')

module.exports = merge(baseConfig, {
  entry: {
    app: './client/client-entry.js'
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: true
        }
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  plugins: [
    new VueClientPlugin(),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "../css/[name].css",
    //   chunkFilename: "css/[id].css"
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'template.html')
    // }),
  ],
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'},
    hot: true,
    compress: true,
    port: 2333,
    proxy: {
      '/user/': {
        target: 'https://www.idanmu.cc'
      },
      '/article/': {
        target: 'https://www.idanmu.cc'
      },
      '/option/': {
        target: 'https://www.idanmu.cc'
      }
    }
  }
})

// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const isDev = process.env.NODE_ENV === 'development'
