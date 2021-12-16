const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/cocina', (req, res) => {
	res.send('Hello World from Cocina Service!');
});

app.listen(process.env.PORT, () => {
	console.log("Cocina Service Start on port: " + process.env.PORT);
});