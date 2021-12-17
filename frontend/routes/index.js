const express = require('express');
const router = express.Router();

module.exports = () => {
	router.get('/', (req, res) => {
		res.render('index', {
			title: 'Inicio',
			description: 'Almuerzo Gratis Alegra'
		});
	});

	router.get('/hacer-pedido', (req, res) => {
		res.redirect('/pedido-realizado');
	});

	router.get('/pedido-realizado', (req, res) => {
		res.render('pedidoRealizado', {
			title: 'Pedido Realizado',
			description: 'Su pedido ha sido realizado con éxito'
		});
	});

	router.get('/cocina', (req, res) => {
		res.render('cocina', {
			title: 'Cocina',
			description: 'Área de la cocina',
			ingredients: [
				{ name: 'tomato', quantity: 2 },
				{ name: 'lemon', quantity: 2 },
				{ name: 'potato', quantity: 2 },
				{ name: 'rice', quantity: 2 },
				{ name: 'ketchup', quantity: 2 },
				{ name: 'lettuce', quantity: 2 },
				{ name: 'onion', quantity: 2 },
				{ name: 'cheese', quantity: 2 },
				{ name: 'meat', quantity: 2 },
				{ name: 'chicken', quantity: 2 },
			]
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