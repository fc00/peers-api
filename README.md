# peers-api (WIP)

find hyperboria peers via http

## Why

Cjdns requires that you manually add peers to your configuration file in order to join a network.

The `hyperboria-peers` package contains a geographically sorted list of publically available peers in a JSON data structure.

This server exposes a queryable interface to that data structure, to facillitate automatic configuration of new cjdns nodes.

## Installation

```
git clone https://github.com/fc00/peers-api;
cd peers-api;
npm install;
cp config.js.dist config.js;
node server;
```

## Usage (TBD)

```Bash
# Find peers in North America
curl https://peers.fc00.io/1/location/na
```

## See also

[a dedicated client written in nodejs](https://github.com/fc00/peers-api-client)
