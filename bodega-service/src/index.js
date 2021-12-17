const express = require('express');
const app = express();

app.use(express.json());
// Endpoint que se usara para comprar los ingredientes
// https://recruitment.alegra.com/api/farmers-market/buy 
app.get('/api/bodega', (req, res) => {
	res.send('Hello World from Bodega Service!');
});

app.listen(process.env.PORT, () => {
	console.log("Bodega Service Start on port: " + process.env.PORT);
});