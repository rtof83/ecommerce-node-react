const deleteCustomer = require('express').Router();
const Customer = require('../../models/Customer');

deleteCustomer.delete('/:id', async (req, res) => {
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

module.exports = deleteCustomer;
