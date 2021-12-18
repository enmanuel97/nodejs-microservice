const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bodega', require('./routes'));

// app.listen(process.env.PORT, () => {
// 	console.log("Bodega Service Start on port: " + process.env.PORT)
// });

app.listen(3004, () => {
	console.log("Bodega Service Start on port: 3004")
});