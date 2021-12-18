const db = require('../database/db');
const axios = require('axios');

exports.recibirPedido = async (req, res) => {
	try {
		const receta = await axios.get(`http://localhost:3003/api/receta`);
		// const receta = await axios.get(`${location.origin}/api/receta`);
		const pedido = await db.Pedidos.create(
			{
				recetaId: receta.data.id,
			}
		);

		res.status(200).json({
			message: 'Pedido recibido',
			pedido
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}

exports.prepararPedido = async (req, res) => {
	console.log(req);
}

exports.ultimosPedidos = async (req, res) => {

	try {
		const pedidos = await db.Pedidos.findAll({
			where: {
				status: {
					[db.Op.in]: [1, 2]
				}
			},
			order: [
				['id', 'ASC']
			],
		});
		res.status(200).json({
			message: 'Pedidos recibidos',
			pedidos
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}