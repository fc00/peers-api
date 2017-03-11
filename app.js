var Peers = require("hyperboria-peers");

var Ecstatic = require("ecstatic");

var identity = function (x) { return x; };

var parseReq = function (req) {
    return req.url.split(/\//).filter(identity);
};

var asJSON = function (res, json) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(json, null, 2) + '\n');
};

var routes = [
    [
        '/1/location/<eu|na>',
    ]
];

var lowerArray = function (A) {
    return A.map(function (a) {
        return a.toLowerCase();
    });
};

var Static = Ecstatic({
    root: __dirname + '/www',
    handleError: false
});


var testPeer = function (o, f) {
    return Object.keys(o).some(function (k) {
        return f(o[k]);
    });
};

var matchLocation_1 = function (args) {
    // case-insensitive match against user-provided locations
    var lowered = lowerArray(args.slice(1));
    if (!lowered.length) {
        return Peers.map(function (x) { return x; });
    }

    // iterate over the list of peers, throwing away paths that don't match
    return Peers.filter(function (x, P) {
        // normalize location data, excluding file names
        var p = lowerArray(P.slice(0, -1));
        var l = p.length;
        var last = -1;

        var i = 0;
        // iterate over the search terms...
        for (;i < lowered.length;i++) {
            // search terms must be strictly ordered
            last = p.indexOf(lowered[i], last + 1)
            if (last === -1) { return; }
        }
        return true;
    });
};

module.exports = function (Config) {
    return function (req, res) {
        var send = function (data) { asJSON(res, data); };
        var home = function () {
            Static(req, res);
            /*
            send({
                source: 'https://github.com/fc00/peers-api',
                bugs: 'https://github.com/fc00/peers-api/issues/',
                routes: routes[0],
            });*/
        };

        var four04 = function (req, res) {
            req.url = '/404.html';
            Static(req, res);
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
            switch (args[0]) {
                case 'version':
                    return send({
                        result: Peers.version,
                    });
                case 'location':
                    return send({
                        result: matchLocation_1(args),
                    });
                case 'peerName':
                    if (!args[1]) {
                        return send({
                            result: Peers.filter(function (x) {
                                return testPeer(x, function (peer) {
                                    return peer.peerName;
                                });
                            }),
                        });
                    }
                    return send({
                        result: Peers.filter(function (x) {
                            return testPeer(x, function (peer) {
                                return peer.peerName === args[1];
                            });
                        }),
                    });
                default:
                    four04(req, res);
                    break;
            }
        };

        handleVersion1(argv.slice(1));
    };
};

