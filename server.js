require('dotenv').load()
require('babel-core/register');

var express = require('express'),
    path = require('path'),
    webpack = require('webpack'),
    devMiddleware = require('webpack-dev-middleware'),
    hotMiddleware = require('webpack-hot-middleware'),
    React = require('react'),
    ReactDOM = require('react-dom/server'),
    config = require('./webpack.config.dev'),
    Html = require('./src/Html'),
    app = express()
    compiler = webpack(config)

app.set('host', 'localhost')
app.set('port', 8080)
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(hotMiddleware(compiler))

app.all('*', function (req, res) {
  var Base = React.createElement(Html)
  res.status(200).send('<!doctype html>' + ReactDOM.renderToStaticMarkup(Base))
})

app.listen(app.get('port'), app.get('host'), function (err) {
  if (err) throw new Error(err)

  console.log('\x1b[32m[server]\x1b[0m Listening at http://%s:%s',
    app.get('host'),
    app.get('port')
  );
});
