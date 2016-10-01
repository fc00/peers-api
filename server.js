var Http = require("http");
var Peers = require("hyperboria-peers");
var App = require("./app");
var Config = require("./config");

Http.createServer(App(Config, Peers))
    .listen(Config.port, Config.address, Config.ready);

