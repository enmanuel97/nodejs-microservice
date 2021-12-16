const express = require('express');
const router = express.Router();

module.exports = () => {
	router.get('/', (req, res) => {
		res.render('index', {
			title: 'Inicio',
			description: 'Almuerzo Gratis Alegra'
		});
	});

	router.get('/cocina', (req, res) => {
		res.render('cocina', {
			title: 'Cocina',
			description: 'Esta es la cocina'
		});
	});

	return router;
}