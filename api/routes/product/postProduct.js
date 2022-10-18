const postProduct = require('express').Router();
const Product = require('../../models/Product');

postProduct.post('/', async (req, res) => {
  const product = await Product.findOne({ sku: req.body.sku });

  if (product)
   return res.status(419).json({ message: `sku '${product.sku}' already exist in database` });

  try {
    await Product.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = postProduct;
