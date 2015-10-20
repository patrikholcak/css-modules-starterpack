require('dotenv').load()

import express from 'express'
import path from 'path'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config.dev'

import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import Html from './src/Html'

var app = express()
var compiler = webpack(config)

app.set('host', 'localhost')
app.set('port', 8080)
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(hotMiddleware(compiler))

app.all('*', (req, res) => {
  var Base = React.createElement(Html)
  res.status(200).send('<!doctype html>' + renderToStaticMarkup(Base))
})

app.listen(app.get('port'), app.get('host'), (err) => {
  if (err) throw new Error(err)

  console.log('\x1b[32m[server]\x1b[0m Listening at http://%s:%s',
    app.get('host'),
    app.get('port')
  );
});
