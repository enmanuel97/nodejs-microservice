const express = require('express');
const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
	console.log("Cocina Service Start on port: " + process.env.PORT);
});