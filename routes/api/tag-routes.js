const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }
    ]
  })
    .then(dbCatagoryData => res.json(dbCatagoryData))
    .catch(err => {
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }
    ]
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.Update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(dbCatagoryData => {
      if (!dbCatagoryData[0]) {
        res.status(404).json({ message: 'Tag not found with id' });
      }
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCatagoryData => {
      if (!dbCatagoryData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbCatagoryData);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


module.exports = router;
