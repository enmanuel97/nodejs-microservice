const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/api/cocina', require('./routes'));

// app.listen(process.env.PORT, () => {
// 	console.log("Cocina Service Start on port: " + process.env.PORT);
// });
app.listen(3001, () => {
	console.log("Cocina Service Start on port: 3001");
});