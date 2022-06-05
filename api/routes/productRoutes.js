const router = require('express').Router();
const Product = require('../models/Product');

router.post('/', async (req, res) => {
    const { name, desc, quant, price, image } = req.body;
  
    const product = {
      name,
      desc,
      quant,
      price,
      image
    }
  
    try {
      await Product.create(product)
  
      res.status(201).json({ message: 'Record inserted successfully!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
router.get('/', async (_, res) => {
try {
    const product = await Product.find()

    res.status(200).json(product)
} catch (error) {
    res.status(500).json({ erro: error })
}
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const product = await Product.findOne({ _id: id })

  if (!product) {
    res.status(422).json({ message: 'Produto não encontrado!' })
    return
  }

  try {
    await Product.deleteOne({ _id: id })

    res.status(200).json({ message: 'Produto removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const { name, desc, quant, price, image } = req.body;
  
  const product = {
    name,
    desc,
    quant,
    price,
    image
  };

  try {
    const updatedProduct = await Product.updateOne({ _id: id }, product)

    if (updatedProduct.matchedCount === 0) {
      res.status(422).json({ message: 'Produto não encontrado!' })
      return
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const product = await Product.findOne({ _id: id })

    if (!product) {
      res.status(422).json({ message: 'Pedido não encontrado!' })
      return
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

module.exports = router;