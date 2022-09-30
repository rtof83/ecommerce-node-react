const getCustomerById = require('express').Router();
const Customer = require('../../models/Customer');
const mongoose = require('mongoose');

getCustomerById.get('/:id', async (req, res) => {
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

module.exports = getCustomerById;
