const getOrderById = require('express').Router();
const mongoose = require('mongoose');
const Order = require('../../models/Order');

getOrderById.get('/:id', async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.id)) {
      const order = await Order.findOne({ _id: req.params.id });

      if (!order)
        return res.status(422).json({ message: 'Record not found!' });

      res.status(200).json(order);
    } else {
      return res.status(419).json({ message: `id '${req.params.id}' is invalid` });
    }
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = getOrderById;
