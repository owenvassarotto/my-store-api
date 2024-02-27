const { faker } = require('@faker-js/faker');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// get all categories
router.get('/', (req, res) => {
  const categories = [];
  const {size} = req.query;
  const limit = size || 20;
  for (let i = 0; i < limit; i++) {
    categories.push({
      id: uuidv4(),
      name: faker.commerce.department.name,
    })
  }
  res.json(categories);
});

// get an specific category by id
router.get('/:id', (req, res) => {
  res.json({
    id: uuidv4(),
    name: "Electronic"
  })
});

router.get('/:categoryId/products/:productId', (req, res) => {

  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
  })
});

module.exports = router;
