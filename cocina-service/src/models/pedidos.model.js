const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
		recetaId: {
			type: DataTypes.INTEGER
		},
        createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		status : {
			type: DataTypes.SMALLINT,
			defaultValue: 1,
		},
    };

	const options = {
		tableName: 'pedidos',
		timestamps: false
	};
	
    return sequelize.define('Pedidos', attributes, options);
}