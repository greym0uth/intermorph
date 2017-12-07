module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: 'eslint:recommended',
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	rules: {
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		indent: ['error', 'tab']
	}
};
