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
	try {
		const { ingredientes } = req.params;
		
		const inventario = await db.Bodega.findAll({
			where: {
				name: {
					[db.Op.in]: ingredientes.split(',')
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

exports.actualizarInventario = async (req, res) => {
	try {
		const { ingredients } = req.body;
		const {type} = req.params;

		let ingredientsString = '';
		for (let i = 0; i < ingredients.length; i++) {
			ingredientsString += `${ingredients[i].name},`;
		}
		
		const inventarioActual = await db.Bodega.findAll({
			where: {
				name: {
					[db.Op.in]: ingredientsString.slice(0, -1).split(',')
				}
			}
		});
		
		for (let i = 0; i < inventarioActual.length; i++) {
			let ingrediente = inventarioActual[i];
			for (let j = 0; j < ingredients.length; j++) {
				if (ingrediente.name === ingredients[j].name) {
					if(type === 'agregar') {
						ingrediente.cantidad += ingredients[j].quantity;
					} else {
						ingrediente.cantidad -= ingredients[j].quantity;
					}
				}
			}
			await ingrediente.save();
		}
		
		res.status(200).json({
			message: 'Inventario actualizado'
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}
