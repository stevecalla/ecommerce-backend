const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data  
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    
    console.log(tagData.every(tag => tag instanceof Tag)); // true
    console.log("All tags:", JSON.stringify(tagData, null, 2));

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag

  const newTag = await Tag.create({ tag_name: req.body.tag_name });
  
  res.status(200).json(newTag);

  console.log(req.body);
  console.log("Jane's auto-generated ID:", newTag.dataValues);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({ tag_name: req.body.tag_name }, {
      where: {
        id: req.params.id
      }
    });

    if (!updatedTag || updatedTag[0] === 0) {
      res.status(404).json({ message: 'Can\'t update. No tag found with that id!' });
      return;
    }

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'Can\'t delete. No tag found with that id!' });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
