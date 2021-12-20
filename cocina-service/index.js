const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/api/cocina', require('./src/routes'));

app.listen(4001, () => {
	console.log("Cocina Service Start on port: 4001");
});