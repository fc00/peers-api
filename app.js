var Peers = require("hyperboria-peers");

var identity = function (x) { return x; };

var parseReq = function (req) {
    return req.url.split(/\//).filter(identity);
};

var asJSON = function (res, json) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(json, null, 2) + '\n');
};

var routes = [
    [
        '/1/location/<continent>',
    ]
];

module.exports = function (Config) {
    return function (req, res) {
        var send = function (data) { asJSON(res, data); };
        var home = function () {
            send({
                source: 'https://github.com/fc00/peers-api',
                bugs: 'https://github.com/fc00/peers-api/issues/',
                routes: routes[0],
            });
        };

        var argv = parseReq(req);
        if (Config.debug === true) {
            console.log(argv);
        }

        var apiVersion;

        if (argv.length === 0) { return home(); }
        if (argv.length >= 1) {
            apiVersion = parseInt(argv[0]);
            if (isNaN(apiVersion)) {
                return home();
            }
        }

        // if you get here, it's not the home route, and there's a valid version
        var handleVersion1 = function (args) {
            if (args[1] && args[0] === 'location') {
                return send({
                    result: Peers.filter(function (x, p) {
                        return p.indexOf(args[1]) !== -1;
                    })
                });
            }
        };

        handleVersion1(argv.slice(1));
    };
};

