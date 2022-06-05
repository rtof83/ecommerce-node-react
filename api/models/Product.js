const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
  name: String,
  desc: String,
  quant: Number,
  price: Number,
  image: String
})

module.exports = Product
