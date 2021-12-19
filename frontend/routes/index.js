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
		
		const { data: ingredients } = await axios.get(`http://localhost:3000/bodega/ingredientes`);
		const { data: pedidos } = await axios.get(`http://localhost:3000/cocina/ultimos-pedidos/1,2`);

		res.render('cocina', {
			title: 'Cocina',
			description: 'Área de la cocina',
			ingredients,
			pedidos: pedidos.pedidos
		});
	});

	router.get('/cocina/historial-pedidos', async (req, res) => {
		const { data: pedidos } = await axios.get(`http://localhost:3000/cocina/ultimos-pedidos/3`);

		res.render('historialPedidos', {
			title: 'Historial de pedidos',
			description: 'Historial de pedidos',
			pedidos: pedidos.pedidos
		});
	});

	return router;
}