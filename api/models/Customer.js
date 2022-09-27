const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', {
  name: String,
  address: String,
  email: String,
  cpf: String,
  phone: String,
  birth: Date,
  password: String,
  access: String
});

module.exports = Customer;
