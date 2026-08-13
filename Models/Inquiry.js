const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inquiry = sequelize.define('Inquiry', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  phone: { type: DataTypes.STRING(30), allowNull: false },
  email: { type: DataTypes.STRING(190), allowNull: false, validate: { isEmail: true } },
  service: { type: DataTypes.STRING(120), allowNull: false },
  company: { type: DataTypes.STRING(190), allowNull: true },
  message: { type: DataTypes.TEXT, allowNull: true },
}, { tableName: 'inquiries' });

module.exports = Inquiry;

