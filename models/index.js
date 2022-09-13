// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// todo:Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// todo:Categories have many Products
// Define a Category as having many Products, thus creating a foreign key in the `product` table
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// todo:Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: 'product_tag' });

// todo:Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: 'product_tag' });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
