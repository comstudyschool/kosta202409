const { Sequelize } = require('sequelize');

const db = 'kosta285';
const user = 'comstudy';
const password = 'comstudy';
const option = {
    host: 'localhost',
    dialect: 'mysql'
}

const sequelize = new Sequelize(db, user, password, option);

module.exports = sequelize;