var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    mixins = require('./src/styles/mixins'),
    autoprefixer = ['last 2 versions'];

module.exports = {
  devtool: 'source-map',
  entry: {
    client: './src/client'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        toplevel: true
      },
      warnings: true,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /main\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1!postcss-loader')
    }, {
      test: /^((?!main).)*\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    }]
  },
  postcss: [
    require('postcss-mixins')({
      mixins: mixins
    }),
    require('postcss-nested'),
    require('autoprefixer')({browsers: autoprefixer})
  ]
};
