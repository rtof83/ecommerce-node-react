const getCustomers = require('express').Router();
const Customer = require('../../models/Customer');

getCustomers.get('/', async (req, res) => {
  try {
    let customers;
    let query = {};

    if (req.query.name || req.query.page) {
      if (req.query.name) query.name = { $regex: req.query.name, "$options": "i" };

      const perPage = 10;
      const total = await Customer.count(query);
      const pages = Math.ceil(total / perPage);
      const pageNumber = !req.query.page ? 1 : req.query.page;
      const startFrom = (pageNumber - 1) * perPage;

      if (pageNumber > 0 && pageNumber <= pages) {
        customers = await Customer.find(query)
          .sort('name')
          .skip(startFrom)
          .limit(perPage)
          .exec();

        // adding pagination to array
        customers.push({ page: parseInt(pageNumber), from: pages });
      }
    } else {
      // GET ALL
      customers = await Customer.find();
    };

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = getCustomers;
