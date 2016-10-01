var Peers = require("hyperboria-peers");

var asJSON = function (res, json) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(json, null, 2));
};

module.exports = function (Config) {
    return function (req, res) {
        var send = function (data) {
            asJSON(res, data);
        };

        switch (req.url) {
            case '/all':
                send(Peers.peers);
                break;
            default:
                send({
                    options: [
                        '/all',
                    ]
                });
        }
    };
};

