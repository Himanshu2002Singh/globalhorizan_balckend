const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscriber = sequelize.define('Subscriber', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  email: {
    type: DataTypes.STRING(190),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
}, { tableName: 'subscribers' });

module.exports = Subscriber;

