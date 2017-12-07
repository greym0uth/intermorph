const { info } = require('winston');
const { app } = require('./poc-node');

app.listen(3378, () => {
	info("Listening on port 3378");
});
