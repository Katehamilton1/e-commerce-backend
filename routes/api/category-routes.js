const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbCatagoryData => res.json(dbCatagoryData))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbCatagoryData => {
      if (!dbCatagoryData) {
        res.status(404).json({ message: 'No user found with this id' })
        return;
      }
      res.json(dbCatagoryData);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    catagory: req.body.category_name,
  })
    .then(dbCatagoryData => res.json(dbCatagoryData))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCatagoryData => {
    if (!dbCatagoryData[0]) {
      res.status(404).json({ message: 'Invalid category'})
      return;
    }
    res.json(dbCatagoryData)
  })
    .catch(err => {
      res.status(500).json(err)
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCatagoryData => {
      if (!dbCatagoryData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbCatagoryData);
  })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
