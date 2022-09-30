const patchCustomer = require('express').Router();
const Customer = require('../../models/Customer');

patchCustomer.patch('/:id', async (req, res) => {
    try {
      const updatedCustomer = await Customer.updateOne({ _id: req.params.id }, req.body);
  
      if (updatedCustomer.matchedCount === 0)
        return res.status(422).json({ message: 'Record not found!' });
  
      res.status(200).json(req.body);
    } catch (error) {
      res.status(500).json({ erro: error });
    };
  });

  module.exports = patchCustomer;
