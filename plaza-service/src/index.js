const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/plaza', (req, res) => {
	res.send('Hello World from Plaza Service!');
});

app.listen(process.env.PORT, () => {
	console.log("Plaza Service Start on port: " + process.env.PORT);
});