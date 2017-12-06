const { info } = require('winston');
const node = require('./node');

node.listen(3378, () => {
	info("Listening on port 3378");
});