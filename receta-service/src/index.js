const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/api/receta', require('./routes'));

// app.listen(process.env.PORT, () => {
// 	console.log("Receta Service Start on port: " + process.env.PORT)
// });

app.listen(3003, () => {
	console.log("Receta Service Start on port: 3003")
});