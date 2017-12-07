/**
 * Proof-of-Concept for nodes and how they connect and work. P2P-Node will be used in after POC is completed.
 */

const express = require('express');
const bodyParser = require('body-parser');

const Chain = require('./chain');
const Block = require('./Block');

const app = express();
app.use(bodyParser.json());

let peers = [];
let chain = new Chain();

function replaceChain(newChain) { // eslint-disable-line no-unused-vars
	if (newChain.isValid() && newChain.size() > chain.size())
		chain = newChain;
}

app.get('/chain', (req, res) => {
	res.send(JSON.stringify(chain));
});

app.post('/block', (req, res) => {
	let newBlock = Block.generateNextBlock(req.body.data);
	chain.addBlock(newBlock);

	res.status(200).send();
});

app.get('/peers', (req, res) => {
	res.send(JSON.stringify(peers));
});

app.post('/peers', (req, res) => {
	peers.push(req.body.data);

	res.status(200).send();
});

module.exports = {
	app,

};
