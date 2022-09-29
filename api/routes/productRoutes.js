const router = require('express').Router();
const Product = require('../models/Product');

router.post('/', async (req, res) => { 
  try {
    await Product.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});
  
router.get('/', async (req, res) => {
  try {
    let products;
    let query = {};

    if (req.query.name || req.query.page) {
      if (req.query.name) query.name = { $regex: req.query.name, "$options": "i" };

      const perPage = 10;
      const total = await Product.count(query);
      const pages = Math.ceil(total / perPage);
      const pageNumber = !req.query.page ? 1 : req.query.page;
      const startFrom = (pageNumber - 1) * perPage;

      if (pageNumber > 0 && pageNumber <= pages) {
        products = await Product.find(query)
          .sort('name')
          .skip(startFrom)
          .limit(perPage)
          .exec();

        // adding pagination to array
        products.push({ page: parseInt(pageNumber), from: pages });
      }
    } else {
      // GET ALL
      products = await Product.find();
    };

    res.status(200).json(products);
  } catch (error) {
      res.status(500).json({ erro: error });
  };
});

router.delete('/:sku', async (req, res) => {
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

router.patch('/:sku', async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne({ sku: req.params.sku }, req.body);

    if (updatedProduct.matchedCount === 0)
      res.status(422).json({ message: 'Record not found!' });

    res.status(200).json('Record updated successfully!');
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

router.get('/:sku', async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });

    if (!product)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = router;
