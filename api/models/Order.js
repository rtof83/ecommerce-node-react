const mongoose = require('mongoose');

const Order = mongoose.model('Order', {
  customer: mongoose.Types.ObjectId,
  list: [{
    product: String,
    quantity: Number,
    price: Number,
    total: Number,
  }],
  total: Number,
  payment: String,
  date: Date
});

module.exports = Order;
