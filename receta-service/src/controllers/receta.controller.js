const db = require('../database/db');

exports.getReceta = async (req, res) => {
	try {
		const recetaId = (req.params.id) ? req.params.id : Math.floor(Math.random() * 6) + 1;
		const receta = await db.Receta.findByPk(recetaId);
		res.status(200).json(receta);
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}