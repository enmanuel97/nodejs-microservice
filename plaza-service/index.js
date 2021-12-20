const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/plaza', require('./src/routes'));

app.listen(4002, () => {
	console.log("Plaza Service Start on port: 4002");
});
