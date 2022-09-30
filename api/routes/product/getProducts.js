const getProducts = require('express').Router();
const Product = require('../../models/Product');

getProducts.get('/', async (req, res) => {
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

module.exports = getProducts;
