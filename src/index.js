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

		app.listen(port, () => {
			info(`Listening on port ${port}`);
		});
	}

	cycle() {
		let lastChain = node.getChain();

		let liquid = new Architect.Liquid(this.inputs, this.pool, this.outputs, this.connections, this.gates);
		if (node.getChain().getLatestBlock().data.network !== undefined)
			liquid = Network.fromJSON(node.getChain().getLatestBlock().data.network);

		let trainer = new Trainer(liquid);

		let options = {
			cost: Trainer.cost.CROSS_ENTROPY,
			error: 0.0000001,
			iterations: 100000,
			schedule: {
				every: 1000,
				do: (data) => {
					if (node.getChain().size() > lastChain.size())
						return true;

					if (lastChain.getLatestBlock().data.error === undefined || lastChain.getLatestBlock().data.error - data.error > this.minimalAcceptableProgress) {
						node.addBlock({
							error: data.error,
							network: liquid.toJSON()
						});
					}
				}
			}
		};

		trainer.train(this.trainingSet, options);
	}
}
