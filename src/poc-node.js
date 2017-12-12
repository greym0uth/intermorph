/**
 * Proof-of-Concept for nodes and how they connect and work. P2P-Node will be used in after POC is completed.
 */
const { info } = require('winston');

const express = require('express');
const bodyParser = require('body-parser');

const Chain = require('./chain');
const Block = require('./Block');

const app = express();
app.use(bodyParser.json());

let peers = [];
let chain = new Chain();

app.get('/chain', (req, res) => {
	res.json(chain);
});

app.post('/chain', (req, res) => {
	let newChain = req.body.data || '';

	if (newChain !== '' && newChain.isValid() && newChain.size() > chain.size())
		chain = newChain;
});

app.post('/block', (req, res) => {
	let newBlock = Block.generateNextBlock(req.body.data);
	chain.addBlock(newBlock);

	res.status(200).send();
});

app.get('/peers', (req, res) => {
	res.json(peers);
});

app.post('/peers/new', (req, res) => {
	peers.push(req.body.data);

	res.status(200).send();
});

module.exports = {
	app,
	getChain: () => {
		return chain;
	},
	broadcast: () => {
		for (let i = 0; i < peers.length; i++) {
			let peer = peers[i];

			axios.post(`${peer}/chain`, chain).catch(err => {
				info(`Unable to broadcast to peer ${peer}: ${JSON.stringify(err)}`);
			});
		}
	}
};
