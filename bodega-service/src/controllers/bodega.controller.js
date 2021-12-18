const db = require('../database/db');

exports.getTodoEnBodega = async (req, res) => {
	try {
		const ingredients = await db.Bodega.findAll();
		res.status(200).json(ingredients);
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}

exports.getInventarioBodega = async (req, res) => {
	const Op = db.Op;

	try {
		const { ingrendientes } = req.params;
		const inventario = await db.Bodega.findAll({
			where: {
				ingredients: {
					[Op.like]: `%${ingrendientes}%`
				}
			}
		});
		res.status(200).json(inventario);
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}

exports.updateCantidad = async (req, res) => {
	try {
		const { id } = req.params;
		const { cantidad } = req.body;
		const inventario = await db.Bodega.update({
			cantidad
		}, {
			where: {
				id
			}
		});
		res.status(200).json({
			inventario,
			message: 'Cantidad actualizada correctamente'
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}
