require('dotenv').load()

var path = require('path'),
    webpack = require('webpack'),
    mixins = require('./src/styles/mixins'),
    babelQuery = {
      stage: 0,
      plugins: ['react-transform'],
      extra: {
        "react-transform": {
          transforms: [{
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }, {
            'transform': 'react-transform-catch-errors',
            'imports': ['react', 'redbox-react']
          }]
        }
      }
    };

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/dev',
    './src/client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'client.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['transform?envify', 'babel?' + JSON.stringify(babelQuery)],
      include: path.join(__dirname, 'src'),
    }, {
      test: /main\.css$/,
      loaders: [
        'style-loader',
        'css-loader?importLoaders=1',
        'postcss-loader',
      ]
    }, {
      test: /^((?!main).)*\.css$/,
      loaders: [
        'style-loader',
        'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader',
      ]
    }]
  },
  postcss: [
    require('postcss-mixins')({
      mixins: mixins
    }),
    require('postcss-nested')
  ]
};
