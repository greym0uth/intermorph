const { info } = require('winston');
const node = require('./poc-node');
const app = node.app;
const { Trainer, Architect, Network } = require('synaptic');

module.exports = class Intermorph {
	constructor(options = {}) {
		let port = options.port || 3378;

		this.inputs = options.inputs || 1;
		this.outputs = options.outputs || 1;
		this.pool = options.pool || (this.inputs + this.outputs) * 5;
		this.connections = options.connections || (this.inputs + this.outputs) * 6;
		this.gates = options.gates || (this.inputs + this.outputs) * 3;

		this.minimalAcceptableProgress = options.minimalAcceptableProgress || 0.001;
		this.trainingSet = options.trainingSet || {};

		this.iterationsPerTrain = options.iterationsPerTrain || 100;
		this.trainFrequency = options.trainFrequency || 1;
		if (this.trainFrequency === 0)
			throw 'Training frequency 1 or greater!';

		app.listen(port, () => {
			info(`Listening on port ${port}`);
		});
	}

	_train() {
		let lastChain = node.getChain();

		let liquid = new Architect.Liquid(this.inputs, this.pool, this.outputs, this.connections, this.gates);
		if (node.getChain().getLatestBlock().data.network !== undefined)
			liquid = Network.fromJSON(node.getChain().getLatestBlock().data.network);

		let trainer = new Trainer(liquid);

		let options = {
			cost: Trainer.cost.CROSS_ENTROPY,
			error: 0.0000001,
			iterations: this.iterationsPerTrain
		};

		const result = trainer.train(this.trainingSet, options);

		// Check if chain has updated since it trained; if so, return so it can be trained with the updated network on the next cylce.
		if (node.getChain().size() > lastChain.size())
			return;

		// Check if node meets acceptable criteria for updating chain; if so, update the chain.
		if (lastChain.getLatestBlock().data.error === undefined || lastChain.getLatestBlock().data.error - result.error > this.minimalAcceptableProgress) {
			node.addBlock({
				error: result.error,
				network: liquid.toJSON()
			});
		}
	}

	/**
	 * Starts training the network and automatically sync/update the chain with its progress.
	 * @return {void}
	 */
	start() {
		this.intervalId = setInterval(this._train.bind(this), 1000 / this.trainFrequency);
	}

	/**
	 * Stops the training process.
	 * @return {void}
	 */
	stop() {
		if (this.intervalId)
			clearInterval(this.intervalId);
	}
}
