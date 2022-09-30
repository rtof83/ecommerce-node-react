const postOrder = require('express').Router();
const mongoose = require('mongoose');
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const Customer = require('../../models/Customer');

postOrder.post('/', async (req, res) => {
  try {
    // check customer
    if (mongoose.isValidObjectId(req.body.customer)) {
      const customer = await Customer.findOne({ _id: req.body.customer });

      if (!customer)
        return res.status(419).json({ erro: `customer id '${req.body.customer}' not found`});
    } else {
      return res.status(419).json({ erro: `id '${req.body.customer}' is invalid`});
    };

    // check for insufficient product
    for (let i = 0; i < req.body.list.length; i++) {
      const product = await Product.findOne({ sku: req.body.list[i].product });

      if (!product)
        return res.status(419).json({ erro: `sku '${req.body.list[i].product}' not found`});

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

module.exports = postOrder;
