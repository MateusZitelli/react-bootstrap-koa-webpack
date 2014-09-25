var Path = require("path");
var http = require("http");

var koa = require("koa");
var koaStatic = require("koa-static");


var IS_PRODUCTION = "production" === process.env.NODE_ENV;

var app = koa();

app.use(koaStatic(Path.resolve("./public")));

if (!IS_PRODUCTION) {
  var koaWebpackDev = require("koa-webpack-dev");
  var webpackConfig = koaWebpackDev.configure({
    inline: true
  });

  var compiler = require("webpack")(webpackConfig);
  app.use(koaWebpackDev.middleware(compiler, webpackConfig.devServer));
}

var server = http.createServer(app.callback());

if (!IS_PRODUCTION) {
  koaWebpackDev.hotModuleSocket(server, compiler);
}

server.listen(8080);
