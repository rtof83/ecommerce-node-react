const router = require('express').Router();
const Customer = require('../models/Customer');

router.post('/', async (req, res) => {
  const { email } = await Customer.findOne({ email: req.body.email });
  if (email)
   return res.status(419).json({ message: `email '${email}' already exist in database` });

  try {
    await Customer.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});
  
router.get('/', async (_, res) => {
  try {
    const customer = await Customer.find();

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

router.post('/getUser', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id });

  if (!customer)
    res.status(422).json({ message: 'Record not found!' });

  try {
    await Customer.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.updateOne({ _id: req.params.id }, req.body);

    if (updatedCustomer.matchedCount === 0)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    if (!customer)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = router;
