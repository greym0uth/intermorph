const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(index, previousHash, timestamp, data) {
		this.index = index;
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.data = data;
		this.hash = calculateHash(this.index, this.previousHash, this.timestamp, this.data).toString();
	}
	
	static calculateHash(index, previousHash, timestamp, data) {
		return SHA256(index + previousHash + timestamp + data);
	}
	
	static calculateHashFromBlock(block) {
		return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
	}
	
	static generateNextBlock(data) {
		let previousBlock = getLatestHash();
		let nextIndex = previous.index + 1;
		let nextTimestamp = new Date().getTime() / 1000;
		
		return new Block(nextIndex, previousBlock.hash, nextTimestamp, data);
	}
	
	static produceGenesis() {
		return new Block(0, "0", new Date().getTime() / 1000, "RIP Gavi");
	}
	
	static isValidBlock(newBlock, previousBlock) {
		if (previousBlock.index + 1 !== newBlock.index) {
			return false;
		} else if (previousBlock.hash !== newBlock.previousHash) {
			return false;
		} else if (calculateHashFromBlock(newBlock) !== newBlock.hash) {
			return false;
		}
		
		return true;
	}
}

module.exports = Block;