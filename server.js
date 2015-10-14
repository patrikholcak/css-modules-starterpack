var express = require('express'),
    path = require('path'),
    webpack = require('webpack'),
    devMiddleware = require('webpack-dev-middleware'),
    hotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.set('host', 'localhost');
app.set('port', 8080);
app.use(express.static(__dirname));

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(hotMiddleware(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), app.get('host'), function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
