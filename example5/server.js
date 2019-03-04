var express = require('express');
var app = express();
var path = require('path');

// #1
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var compiler = webpack(webpackConfig);

// #2
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true},
    // 파일을 변경했을 때 번들링을 하는게 아니라, node.js서버를 들어왔을 때만 번들링 한다.
    lazy: true

}));

app.use(express.static(__dirname));

// view engine setup
// __dirname : root folder
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.send('index');
});

app.listen(3000);
console.log("Server running on port 3000");