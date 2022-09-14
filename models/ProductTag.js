const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    //TODO define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //todo:product_id`
    product_id: { 
      //todo:Integer.
      type: DataTypes.INTEGER,
      //todo References the `Product` model's `id`.
      references: {
        // This is a reference to another model
        model: 'product',
        // This is the column name of the referenced model
        key: 'id',
      }
    },
    //todo:tag_id`
    tag_id: {
      //todo:Integer.
      type: DataTypes.INTEGER,
      //todo References the `Tag` model's `id`.
      references: {
        // This is a reference to another model
        model: 'tag',
        // This is the column name of the referenced model
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;

// * `ProductTag`
//   * `id`
//     * Integer.
//     * Doesn't allow null values.
//     * Set as primary key.
//     * Uses auto increment.
//   * `product_id`
//     * Integer.
//     * References the `Product` model's `id`.
//   * `tag_id`
//     * Integer.
//     * References the `Tag` model's `id`.
