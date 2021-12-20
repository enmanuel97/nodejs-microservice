const config = require('./config');
const mysql = require('mysql2/promise');
const { Sequelize, Op } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {

	const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, { 
        host: host,
        dialect: 'mysql' 
    });
    
    db.Op = Op;
    db.Bodega = require('../models/bodega.model')(sequelize);
    
    await sequelize.sync({ alter: true });
    await seedsBodegaTable();
}

async function seedsBodegaTable() {
    const count = await db.Bodega.count();
    if (count === 0) {
        await db.Bodega.bulkCreate([
            { name: 'tomato' },
            { name: 'lemon' },
            { name: 'potato' },
            { name: 'rice' },
            { name: 'ketchup' },
            { name: 'lettuce' },
            { name: 'onion' },
            { name: 'cheese' },
            { name: 'meat' },
            { name: 'chicken' },
        ]);
    }
}

