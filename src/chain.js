const Block = require('./block');

class Chain {
	constructor() {
		this.chain = [ Block.produceGenesis() ];
	}

	isValid() {
		for (let i = 1, previous = 0; i < this.chain.length; i++, previous++) {
			if (!Block.isValidNewBlock(this.chain[i], this.chain[previous]))
				return false;
		}

		return true;
	}

	addBlock(block) {
		this.chain.push(block);
	}

	size() {
		return this.chain.length;
	}

	getLatestHash() {
		return this.chain[this.chain.length - 1];
	}
}

module.exports = Chain;
