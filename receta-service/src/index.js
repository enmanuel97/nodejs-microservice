const express = require('express');
const app = express();

app.listen(process.env.PORT, () => {
	console.log("Receta Service Start on port: " + process.env.PORT);
});