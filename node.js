const express = require('express');
const bodyParser = require('body-parser');

const Chain = require('./chain');

const app = express();
app.use(bodyParser.json());

let peers = [];
let chain = new Chain();

function replaceChain(newChain) {
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
	
	
	res.status(200).send();
});

module.exports = app;