const patchProduct = require('express').Router();
const Product = require('../../models/Product');

patchProduct.patch('/:sku', async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne({ sku: req.params.sku }, req.body);

    if (updatedProduct.matchedCount === 0)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json('Record updated successfully!');
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = patchProduct;
