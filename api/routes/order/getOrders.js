const getOrders = require('express').Router();
const Order = require('../../models/Order');

getOrders.get('/', async (req, res) => {
  try {
    let orders;
    let customer = {};
    let total = 0;

    const query = [
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
        $set:
          {
            'customer_name': { $arrayElemAt: ['$customer_name.name', 0] }
          }
      }
    ];

    if (req.query.page) {
      if (req.query.customer) {
        customer = { $regex: req.query.customer, $options: 'i' };
        query.push({ $match: { 'customer_name': customer }}, { $count: 'records' });

        const count = await Order.aggregate(query);
        query.pop();

        total = count[0].records;
      } else {
        total = await Order.count();
      };

      const perPage = 10;
      const pages = Math.ceil(total / perPage);
      const pageNumber = !req.query.page ? 1 : req.query.page;
      const startFrom = (pageNumber - 1) * perPage;

      if (pageNumber > 0 && pageNumber <= pages) {
        query.push({ $sort: { date: -1 }}, { $skip: startFrom }, { $limit: perPage });

        orders = await Order.aggregate(query);

        // adding pagination to array
        orders.push({ page: parseInt(pageNumber), from: pages });
      }
    } else {
      // GET ALL
      orders = await Order.find();
    };

    res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ erro: error });
  };
});

module.exports = getOrders;
