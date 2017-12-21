<div align="center">
	
</div>
<h1 align="center">
	<img src="http://i.pi.gy/R8qbm.png" width="128px" />
	<br />
	intermorph
</h1>

<div align="center">
	<em>A distributed means of training/running neural networks on a blockchain.</em>
</div>

## Installation

```bash
$ yarn add intermorph (Not quite ready yet)
```

## Usage

```js
const Intermorph = require('intermorph');

const trainingSet = [
	{
		input: [0],
		output: [1]
	},
	{
		input: [1],
		output: [0]
	}
];

let morph = new Intermorph({
	trainingSet
});

while (true) {
	morph.cycle();
}
```

## Contributing

1. Make sure you have [NodeJS]() and either [Yarn](https://yarnpkg.com/en/) or [NPM](https://www.npmjs.com/) *(yarn is really great)*
2. Installing dependencies:
```bash
$ cd path/to/intermorph
$ yarn
```
3. Running the example:
```bash
$ yarn start
```
4. Take a look at the [Issues](https://github.com/Jaden-Giordano/intermorph/issues) to see what needs to be done and feel free to send PRs with any fixes or features you'd like to add, make sure you run `yarn test` and correct any issues before submitting.
