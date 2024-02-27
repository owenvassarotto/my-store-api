const express = require('express');

const ProductService = require("../services/products");
const validatorHandler = require("../middlewares/validatorHandler");
const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } = require("../schemas/productSchema");

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// router.get('/filter', async (req, res) => {
//   res.send(`I'm a filter`);
// })

// get an specific product by id
router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const {id} = req.params;

    const product = await service.findOne(id);

    res.json(product);
  } catch (error) {
    next(error);
  }
});

// create product
router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {

  const newProduct = await service.create(req.body)

  res.status(201).json({
    message: "Product CREATED",
    data: newProduct,
  });
});

// update product
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedProduct = await service.update(id, body);

    res.json({
      message: "Product UPDATED",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

// delete product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await service.delete(id);
  res.json({
    id,
    message: "Product DELETED",
  });
});

module.exports = router;

