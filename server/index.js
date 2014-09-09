var koa = require("koa");
var Path = require("path");

var IS_PRODUCTION = "production" === process.env.NODE_ENV;

var app = koa();

if (IS_PRODUCTION) {
  app.use(require("koa-file-server")({
    root: Path.resolve("../public"),
    index: true
  }));
}

// app.use(function *(){
//   this.body = "Hello World";
// });

app.listen(3000);
