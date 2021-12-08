const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns

    id: 
    {
      types: integer,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    tag_name: 
    {
      type: string,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
