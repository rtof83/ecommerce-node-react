const deleteProduct = require('express').Router();
const Product = require('../../models/Product');

deleteProduct.delete('/:sku', async (req, res) => {
  const product = await Product.findOne({ sku: req.params.sku });

  if (!product)
    return res.status(422).json({ message: 'Record not found!' });

  try {
    await Product.deleteOne({ sku: req.params.sku });

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = deleteProduct;
