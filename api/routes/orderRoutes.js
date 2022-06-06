const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/', async (req, res) => {
    const { customer, list, total, pay, date } = req.body;
  
    const order = {
      customer,
      list,
      total,
      pay,
      date
    };
  
    try {
      await Order.create(order);
  
      res.status(201).json({ message: 'Record inserted successfully!' });
    } catch (error) {
      res.status(500).json({ erro: error });
    }

    // update products
    try {
      for (let i = 0; i < order.list.length; i++) {
        const getProduct = await Product.findOne({ _id: order.list[i].product });
        const updatedProduct = await Product.updateOne({ _id: order.list[i].product }, { quant: getProduct.quant - order.list[i].quant } );
        res.status(200).json(updatedProduct);
      }
    } catch (error) {
      res.status(500).json({ erro: error });
    }
  })
  
router.get('/', async (_, res) => {
try {
    const order = await Order.find();

    res.status(200).json(order);
} catch (error) {
    res.status(500).json({ erro: error });
}
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const order = await Order.findOne({ _id: id });

  if (!order) {
    res.status(422).json({ message: 'Pedido não encontrado!' });
    return
  }

  try {
    await Order.deleteOne({ _id: id });

    res.status(200).json({ message: 'Pedido removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findOne({ _id: id });

    if (!order) {
      res.status(422).json({ message: 'Pedido não encontrado!' });
      return
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
})

module.exports = router;
