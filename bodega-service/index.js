const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bodega', require('./src/routes'));

app.listen(4004, () => {
	console.log("Bodega Service Start on port: 4004")
});