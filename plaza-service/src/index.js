const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/plaza', require('./routes'));

// app.listen(process.env.PORT, () => {
// 	console.log("Plaza Service Start on port: " + process.env.PORT);
// });
app.listen(3002, () => {
	console.log("Plaza Service Start on port: 3002");
});
