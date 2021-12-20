const config = require('./config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {

	const { host, port, user, password, database } = config.database;
    
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    db.Receta = require('../models/receta.model')(sequelize);
    
    await sequelize.sync({ alter: true });
    await seedsRecetaTable();
}

async function seedsRecetaTable() {
    const count = await db.Receta.count();
    if (count === 0) {
        await db.Receta.bulkCreate([
            { name: 'Pollo estilo KFC', ingredients: 'potato:2,ketchup:1,chicken:3' },
            { name: 'Arroz con pollo a la crema', ingredients: 'rice:2,lemon:1,onion:1,chicken:2,tomato:2' },
            { name: 'Pancho Pinche', ingredients: 'chicken:1,meat:1,onion:1,lettuce:1,lemon:1,tomato:1' },
            { name: 'Carne guisada con papas', ingredients: 'meat:2,potato:2,onion:1' },
            { name: 'Pollo al limón', ingredients: 'chicken:1,lemon:1,onion:1,tomato:1' },
            { name: 'Albóndigas rellena', ingredients: 'meat:2,cheese:1,ketchup:1' },
        ]);
    }
}