const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
  sku: String,
  name: String,
  desc: String,
  quantity: Number,
  price: Number,
  image: String
});

module.exports = Product;
