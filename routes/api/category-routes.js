const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    console.log(categoryData.every(category => category instanceof Category)); // true
    console.log("All categories:", JSON.stringify(categoryData, null, 2));

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  
  const newCategory = await Category.create({ category_name: req.body.category_name });
  
  res.status(200).json(newCategory);

  // console.log(req.body);
  // console.log("Jane's auto-generated ID:", newCategory.dataValues);

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {
    const updatedCategory = await Category.update({ category_name: req.body.category_name }, {
      where: {
        id: req.params.id
      }
    });

    if (!updatedCategory || updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Can\'t update. No category found with that id!' });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'Can\'t delete. No category found with that id!' });
      return;
    }

    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
