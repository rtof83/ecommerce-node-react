const mongoose = require('mongoose');

const Order = mongoose.model('Order', {
  customer: String,
  list: [{
    product: String,
    quant: Number,
    price: Number
  }],
  total: Number,
  pay: String,
  date: Date
});

module.exports = Order;
