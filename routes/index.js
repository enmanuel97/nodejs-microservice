const express = require('express');
const router = express.Router();

module.exports = () => {
	router.get('/', (req, res) => {
		res.render('index', {
			title: 'Home',
			content: 'Welcome to the home page'
		});
	});

	return router;
}