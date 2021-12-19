const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        ingredients: { type: DataTypes.STRING, allowNull: false }
    };

	const options = {
		tableName: 'recetas',
		timestamps: false
	};
	
    return sequelize.define('Receta', attributes, options);
}