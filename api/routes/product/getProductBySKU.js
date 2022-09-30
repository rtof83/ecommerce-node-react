const getProductBySKU = require('express').Router();
const Product = require('../../models/Product');

getProductBySKU.get('/:sku', async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });

    if (!product)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = getProductBySKU;
