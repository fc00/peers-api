var Http = require("http");
var App = require("./app");
var Config = require("./config");

Http.createServer(App(Config))
    .listen(Config.port, Config.address, Config.ready);

