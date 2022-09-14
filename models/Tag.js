const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    //TODO define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //todo:tag_name`
    tag_name: {
      //todo:String.
      type: DataTypes.STRING,
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


// * `Tag`
//   * `id`
//     * Integer.
//     * Doesn't allow null values.
//     * Set as primary key.
//     * Uses auto increment.
//   * `tag_name`
//     * String.