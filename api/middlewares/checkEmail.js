const Customer = require('../models/Customer');

const checkEmail = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });

    if (!customer)
      next();
    else
      return res.status(419).json({ message: `email '${customer.email}' already exist in database` });

  } catch (error) {
    res.status(500).json({ erro: error });
  }
};

module.exports = checkEmail;
