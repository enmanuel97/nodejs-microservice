const db = require('../database/db');

exports.getReceta = async (req, res) => {
	try {
		const recetaId = Math.floor(Math.random() * 5) + 1;
		const receta = await db.Receta.findByPk(recetaId);
		res.status(200).json(receta);
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}