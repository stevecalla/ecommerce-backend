// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    //todo define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      //TODO:Doesn't allow null values.
      allowNull: false,
    },
    price: {
      //TODO:Decimal
      type: DataTypes.DECIMAL,
      //TODO:Doesn't allow null values.
      allowNull: false,
      //TODO:Validates that the value is a decimal.
      validate: {
        isDecimal: true,
      }
    },
    stock: {
      //TODO:Integer.
      type: DataTypes.INTEGER,
      //TODO:Doesn't allow null values.
      allowNull: false,
      //TODO:Set a default value of `10`.
      defaultValue: "10",
      //TODO:Validates that the value is numeric.
      validate: {
        isNumeric: true,
      }
    },
    category_id: {
      //TODO:Integer.
      type: DataTypes.INTEGER,
      //TODO:References the `Category` model's `id`.
      references: {
        // This is a reference to another model
        model: 'category',
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
    modelName: 'product',
  }
);

module.exports = Product;