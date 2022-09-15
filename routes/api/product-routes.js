const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    
    console.log(productData.every(product => product instanceof Product)); // true
    console.log("All products:", JSON.stringify(productData, null, 2));
    
    res.status(200).json(productData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single product by its `id`
// be sure to include its associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 console.log(req.body);

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      console.log('AAAA = ', product);
      // find all associated tags from ProductTag

      if (product[0] === 0) {  //section revised code (hacky solution but I don't want to re-write the entire code)
        res.status(400).json({"missing": "No product with that id"});
        return
      }

      // // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      console.log('BBBB = ', productTags, productTags.length);

      if (!productTags || productTags.length === 0) {  //section revised code (hacky solution but I don't want to re-write the entire code)
        res.status(400).json({"missing": "big error #2"});
        return
      }

      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => {
      console.log('CCCC = ', updatedProductTags);

    if (!updatedProductTags) {  //section revised code (hacky solution but I don't want to re-write the entire code)
      console.log('DDDD = ', "big error #3");
      res.status(400).json({"missing": "big error #3"});
      return
    }
      res.json(updatedProductTags)
    })
    // .then((updatedProductTags) => res.json(updatedProductTags); //section original starter code throws an error if no product exists
    .catch((err) => {
      // console.log(err);

      res.send(); //section revised code (hacky solution but I don't want to re-write the entire code)

      // res.status(400).json(err); //section original starter code throws an error if no product exists
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedProduct) {
      res.status(404).json({ message: 'Can\'t delete. No product found with that id!' });
      return;
    }

    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
