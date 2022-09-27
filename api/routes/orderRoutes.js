const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/', async (req, res) => {
  try {
    // check for insufficient product
    for (let i = 0; i < req.body.list.length; i++) {
      const product = await Product.findOne({ sku: req.body.list[i].product });

      if (product.quantity < req.body.list[i].quantity)
        return res.status(419).json({ erro: `insufficient amount of product '${product.name}'` });
    };

    // update products
    let total = 0;
    for (let i = 0; i < req.body.list.length; i++) {
      const getProduct = await Product.findOne({ sku: req.body.list[i].product });
      await Product.updateOne({ sku: req.body.list[i].product }, { quantity: getProduct.quantity - req.body.list[i].quantity } );
    
      // calculating price x quantity
      req.body.list[i].price = getProduct.price;
      req.body.list[i].total = getProduct.price * req.body.list[i].quantity;

      // update total order
      total += req.body.list[i].total;
    };
    req.body.total = total.toFixed(2);

    // created at
    req.body.date = (new Date());

    // create order
    await Order.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});
  
router.get('/', async (_, res) => {
  try {
    const order = await Order.aggregate([
      {
        $lookup:
            {
              from: 'customers',
              localField: 'customer',
              foreignField : '_id',
              as: 'customer_name'
            }
        },
        {
          $set: {
            customer_name: { $arrayElemAt: ['$customer_name.name', 0] }
          }
        }
      ]);

      res.status(200).json(order);
  } catch (error) {
      res.status(500).json({ erro: error });
  };
});

router.delete('/:id', async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });

  if (!order)
    return res.status(422).json({ message: 'Record not found!' });

  try {
    await Order.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });

    if (!order)
      return res.status(422).json({ message: 'Pedido não encontrado!' });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = router;
