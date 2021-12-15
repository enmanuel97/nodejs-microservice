const express = require('express');
const app = express();

app.listen(process.env.PORT, () => {
	console.log("Plaza Service Start on port: " + process.env.PORT);
});