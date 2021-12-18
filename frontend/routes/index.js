const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = () => {
	router.get('/', (req, res) => {
		res.render('index', {
			title: 'Inicio',
			description: 'Almuerzo Gratis Alegra'
		});
	});

	router.get('/cocina', async (req, res) => {
		const { data: ingredients } = await axios.get(`http://localhost:3004/api/bodega/ingredientes`);
		const { data: pedidos } = await axios.get(`http://localhost:3001/api/cocina/ultimos-pedidos`);
		
		res.render('cocina', {
			title: 'Cocina',
			description: 'Área de la cocina',
			ingredients,
			pedidos
		});
	});

	router.get('/cocina/historial-pedidos', (req, res) => {
		res.render('historialPedidos', {
			title: 'Historial de pedidos',
			description: 'Historial de pedidos',
			orders: [
				{
					id: 1,
					date: '12/12/12',
					recipeName: 'Pizza',
					ingredients: [
						{ name: 'tomato', quantity: 2 },
						{ name: 'lemon', quantity: 2 },
						{ name: 'potato', quantity: 2 },
						{ name: 'rice', quantity: 2 },
						{ name: 'ketchup', quantity: 2 },
					]
				},
				{
					id: 2,
					date: '12/12/12',
					recipeName: 'Pizza',
					ingredients: [
						{ name: 'tomato', quantity: 2 },
						{ name: 'lemon', quantity: 2 },
						{ name: 'potato', quantity: 2 },
						{ name: 'rice', quantity: 2 },
						{ name: 'ketchup', quantity: 2 },
					]
				},
				{
					id: 3,
					date: '12/12/12',
					recipeName: 'Pizza',
					ingredients: [
						{ name: 'tomato', quantity: 2 },
						{ name: 'lemon', quantity: 2 },
						{ name: 'potato', quantity: 2 },
						{ name: 'rice', quantity: 2 },
						{ name: 'ketchup', quantity: 2 },
					]
				},
			]
		});
	});

	return router;
}