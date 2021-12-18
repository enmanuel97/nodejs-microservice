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
            { name: 'Pizza', ingredients: 'Pan, queso, jamón, aceitunas'},
            { name: 'Hamburguesa', ingredients: 'Pan, queso, jamón, aceitunas' },
            { name: 'Tortilla', ingredients: 'Pan, queso, jamón, aceitunas'},
            { name: 'Ensalada', ingredients: 'Pan, queso, jamón, aceitunas' },
            { name: 'Pollo', ingredients: 'Pan, queso, jamón, aceitunas' }
        ]);
    }
}

