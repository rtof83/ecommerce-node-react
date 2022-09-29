const router = require('express').Router();
const Customer = require('../models/Customer');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  const { email } = await Customer.findOne({ email: req.body.email });
  if (email)
   return res.status(419).json({ message: `email '${email}' already exist in database` });

  try {
    await Customer.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});
  
router.get('/', async (req, res) => {
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

router.post('/getUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Customer.find({ email: email, password: password });

    if (!user)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id });

  if (!customer)
    res.status(422).json({ message: 'Record not found!' });

  try {
    await Customer.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.updateOne({ _id: req.params.id }, req.body);

    if (updatedCustomer.matchedCount === 0)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

router.get('/:id', async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.id)) {
      const customer = await Customer.findOne({ _id: req.params.id });

      if (!customer)
        return res.status(422).json({ message: 'Record not found!' });

      res.status(200).json(customer);
    } else {
      res.status(400).json({ message: 'invalid id' })
    }
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = router;
