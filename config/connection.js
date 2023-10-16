//requires sequelize/ dotenv
const Sequelize = require('sequelize');
require('dotenv').config();

//gets squalize host info
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
  }
);
//exports sequalize
module.exports = sequelize;
