const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', {
  name: String,
  address: String,
  email: String,
  password: String,
  access: String
})

module.exports = Customer
