const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobPost = sequelize.define('JobPost', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  department: { type: DataTypes.STRING(120), allowNull: true },
  location: { type: DataTypes.STRING(255), allowNull: true },
  job_type: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'full-time' },
  description: { type: DataTypes.TEXT('long'), allowNull: false },
  requirements: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  salary_range: { type: DataTypes.STRING(120), allowNull: true },
  status: { type: DataTypes.ENUM('open', 'closed'), allowNull: false, defaultValue: 'open' },
}, { tableName: 'job_posts', createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = JobPost;

