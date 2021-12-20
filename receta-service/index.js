const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/api/receta', require('./src/routes'));

app.listen(4003, () => {
	console.log("Receta Service Start on port: 4003")
});