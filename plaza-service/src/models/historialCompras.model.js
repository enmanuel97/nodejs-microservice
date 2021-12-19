const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        ingredientId: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
    };

	const options = {
		tableName: 'historial_compras',
		timestamps: false
	};
	
    return sequelize.define('HistorialCompras', attributes, options);
}