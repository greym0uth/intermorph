const libp2p = require('libp2p');
const WS = require('libp2p-websockets');
const spdy = require('libp2p-spdy');
const secio = require('libp2p-secio');
const MulticastDNS = require('libp2p-mdns');
const DHT = require('libp2p-kad-dht');

class Node extends libp2p {
	constructor(peerInfo, peerBook, options) {
		options = options || {};
		
		const modules = {
			transport: [
				new WS()
			],
			connection: {
				muxer: [
					spdy
				],
				crypto: [
					secio
				]
			},
			discovery: [
				new MulticastDNS(peerInfo)
			],
			dht: DHT
		};
		
		super(modules, peerInfo, peerBook, options); 
	}
}

module.exports = Node;