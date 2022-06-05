const router = require('express').Router();
const Customer = require('../models/Customer');

router.post('/', async (req, res) => {
    const { name, address, email, password, access } = req.body;
  
    const customer = {
      name,
      address,
      email,
      password,
      access
    };
  
    try {
      await Customer.create(customer)
  
      res.status(201).json({ message: 'Record inserted successfully!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
router.get('/', async (_, res) => {
  try {
    const customer = await Customer.find()

    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post('/getUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Customer.find({ email: email, password: password });

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const customer = await Customer.findOne({ _id: id })

  if (!customer) {
    res.status(422).json({ message: 'Usuário não encontrado!' })
    return
  }

  try {
    await Customer.deleteOne({ _id: id })

    res.status(200).json({ message: 'Usuário removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const { name, address, email, password, access } = req.body;
  
  const customer = {
    name,
    address,
    email,
    password,
    access
  };

  try {
    const updatedCustomer = await Customer.updateOne({ _id: id }, customer)

    if (updatedCustomer.matchedCount === 0) {
      res.status(422).json({ message: 'Cliente não encontrado!' })
      return
    }

    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const customer = await Customer.findOne({ _id: id })

    if (!customer) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

module.exports = router;