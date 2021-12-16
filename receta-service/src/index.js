const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/receta', (req, res) => {
	res.send('Hello World from Receta Service!');
});

app.listen(process.env.PORT, () => {
	console.log("Receta Service Start on port: " + process.env.PORT);
});