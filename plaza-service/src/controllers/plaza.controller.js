const db = require('../database/db');
const axios = require('axios');

exports.hacerCompra = async (req, res) => {
	try {		
		const { ingredients } = req.body;

		ingredients.forEach(async (ingredient) => {
			const {data: compra} = await axios.get(`https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${ingredient}`);

			if(compra.quantitySold > 0) {
				var ingredienteComprado = [];
				const pedidos = await db.query(`SELECT id FROM bodega WHERE name = '${ingredient}'`, { type: db.QueryTypes.SELECT });
				ingredienteComprado.push({
					name: ingredient,
					quantity: compra.quantitySold
				});
				
				await db.HistorialCompras.create(
					{
						ingredientId: pedidos[0].id,
						quantity: compra.quantitySold,
					}
				);

				await axios.post(`http://localhost:8080/api/bodega/actualizar-inventario/agregar`, {
					ingredients: ingredienteComprado
				});
			}
		});
	
		res.status(200).json({
			status: 'success',
			message: 'Se hizo la solicitud de compra'
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}

exports.historial = async (req, res) => {
	try {
		const { id } = req.params;

		const historial = await db.HistorialCompras.findAll({
			where: {
				ingredientId: id
			},
			order: [['date', 'DESC']]
		});

		res.status(200).json({
			status: 'success',
			historial
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}