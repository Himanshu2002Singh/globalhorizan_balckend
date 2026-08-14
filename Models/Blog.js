const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// blogs tab;es name chaneg
const Blog = sequelize.define('Blog', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  excerpt: { type: DataTypes.TEXT, allowNull: true },
  content: { type: DataTypes.TEXT('long'), allowNull: false },
  category: { type: DataTypes.STRING(120), allowNull: true },
  meta_title: { type: DataTypes.STRING(300), allowNull: true },
  meta_description: { type: DataTypes.TEXT, allowNull: true },
  tags: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  status: { type: DataTypes.ENUM('draft', 'published'), allowNull: false, defaultValue: 'draft' },
  cover_image_url: { type: DataTypes.STRING(1000), allowNull: true },
  
}, { tableName: 'blogs', createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = Blog;

