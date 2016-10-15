# Hyperboria Peers API

An API for finding nearby peers for the [Hyperboria network](https://hyperboria.net/).

You'll need to install [cjdns](https://github.com/cjdelisle/cjdns) to connect.

## Usage

Query the http server (in your browser or via the command line with `curl` or `wget`) using:

* your two letter continent code
  - eu, na
* your country's top level domain code
  - ca
  - us
  - fr
  - uk
* your region
  - california
  - newyork
  - ontario
* city
  - london
  - paris
* some combination of all of these options.

Prefix your query with the API version (1) and the query type (currently, only location is supported).

## Examples

```Bash
# Find a peer in strasbourg, France, EU
ansuz@box:~$ curl https://peers.fc00.io/1/location/eu/fr/strasbourg
{
  "result": [
    {
      "51.254.25.16:1132": {
        "contact": "me@magik6k.net",
        "password": "thah9aePha1Vusha6ovhpublic",
        "peerName": "Magik6k-sbg1",
        "publicKey": "kw0vfw3tmb6u6p21z5jmmymdlumwknlg3x8muk5mcw66tdpqlw30.k"
      }
    }
  ]
}

```

```
# Find a peer in new york
ansuz@box:~$ curl https://peers.fc00.io/1/location/newyork
{
  "result": [
    {
      "107.170.57.34:63472": {
        "contact": "code@ventricle.us",
        "gpg": "7FE895160E3314027CD3B5D37392CF088BB4345C",
        "location": "digitalocean nyc2",
        "login": "public-peer",
        "password": "ppm6j89mgvss7uvtntcd9scy6166mwb",
        "peerName": "Jacob Henner",
        "publicKey": "1xkf13m9r9h502yuffsq1cg13s5648bpxrtf2c3xcq1mlj893s90.k"
      },
      "[2604:a880:0:1010::f:4001]:63472": {
        "contact": "code@ventricle.us",
        "gpg": "7FE895160E3314027CD3B5D37392CF088BB4345C",
        "location": "digitalocean nyc2",
        "login": "public-peer",
        "password": "ppm6j89mgvss7uvtntcd9scy6166mwb",
        "peerName": "Jacob Henner",
        "publicKey": "1xkf13m9r9h502yuffsq1cg13s5648bpxrtf2c3xcq1mlj893s90.k"
      }
    },
    {
      "192.241.171.154:62718": {
        "contact": "hype@smash-net.org",
        "password": "public_access",
        "publicKey": "q5nhj9kg6ddmk571jb259mct2ljd10z9xvyf05y3hu66wk4qnk20.k",
        "user": "weuxel"
      }
    }
  ]
}

```

## Using the peers you find

Having already installed cjdns on your machine, and generated a configuration file, follow the instructions in the ["Connect your node to your friend's node" section of the README](https://github.com/cjdelisle/cjdns#3-connect-your-node-to-your-friends-node).

This API may return peers which use IPv4, or IPv6 addresses.
It's important that you add them to the correct section of your configuration file.
You should find comments in the config file indicating which is which:

```
// Nodes to connect to (IPv4 only).
"connectTo":
                {
```

IPv4 and IPv6 addresses can be easily distinguised.

An IPv4 is a series of four numbers separated by dots, like so: `123.456.78.90`.

An IPv6 is a series of hexadecimal digits (0-9 and a-f), contained within square brackets, and separated by colons, like so: `[fe80::b606:f465:50ed:2bb]`


## Contributing

If you would like to add a peer, see [Hyperboria's public peer repository](https://github.com/hyperboria/peers).

If you would like the source to this API, it is available [here](https://github.com/fc00/peers-api).

If you find a bug, please report it on [the github issue tracker](https://github.com/fc00/peers-api/issues).
