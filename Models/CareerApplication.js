const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CareerApplication = sequelize.define('CareerApplication', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  phone: { type: DataTypes.STRING(30), allowNull: false },
  email: { type: DataTypes.STRING(190), allowNull: false, validate: { isEmail: true } },
  role: { type: DataTypes.STRING(190), allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: true },
  cv_path: { type: DataTypes.STRING(500), allowNull: false },
  cv_original_name: { type: DataTypes.STRING(255), allowNull: false },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'accepted', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, { tableName: 'career_applications' });

module.exports = CareerApplication;

