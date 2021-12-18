const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        cantidad: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
    };

	const options = {
		tableName: 'bodega',
		timestamps: false
	};
	
    return sequelize.define('Bodega', attributes, options);
}