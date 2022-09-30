const postCustomer = require('express').Router();
const Customer = require('../../models/Customer');

postCustomer.post('/', async (req, res) => {
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

module.exports = postCustomer;
