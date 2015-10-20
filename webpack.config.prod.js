require('dotenv').load()

var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin'),
    mixins = require('./src/styles/mixins'),
    autoprefixer = ['last 2 versions'];

var paths= [
  '/'
]

module.exports = {
  devtool: 'source-map',
  entry: {
    __DELETE__: './src/dev.js',
    client: './src/client.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  plugins: [
    new StaticSiteGeneratorPlugin('__DELETE__', paths),
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
      loaders: ['transform?envify', 'babel']
    }, {
      test: /main\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&importLoaders=1!postcss-loader')
    }, {
      test: /^((?!main).)*\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&modules&importLoaders=1!postcss-loader')
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
