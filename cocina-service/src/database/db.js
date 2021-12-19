const config = require('./config');
const mysql = require('mysql2/promise');
const { Sequelize, Op, QueryTypes } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {

	const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    db.Op = Op;
    db.QueryTypes = QueryTypes;
    db.query = sequelize.query.bind(sequelize);
    db.Pedidos = require('../models/pedidos.model')(sequelize);

    await sequelize.sync({ alter: true });
}