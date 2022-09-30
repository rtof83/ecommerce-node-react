const getUser = require('express').Router();
const Customer = require('../../models/Customer');

getUser.post('/getUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Customer.find({ email: email, password: password });

    if (!user)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = getUser;
