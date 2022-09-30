const deleteOrder = require('express').Router();
const mongoose = require('mongoose');
const Order = require('../../models/Order');

deleteOrder.delete('/:id', async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const order = await Order.findOne({ _id: req.params.id });

    if (!order)
      return res.status(422).json({ message: 'Record not found!' });
  } else {
    return res.status(419).json({ message: `id '${req.params.id}' is invalid` });
  };

  try {
    await Order.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = deleteOrder;
