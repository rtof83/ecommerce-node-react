// config inicial
const express = require('express');
const cors = require('cors');
const { app } = require('./database/conn');

app.use(express.json());
app.use(cors());

// rotas da API
const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/order', orderRoutes);

const customerRoutes = require('./routes/customerRoutes');
app.use('/customer', customerRoutes);

app.get('/', (_, res) => {
  res.json({ message: 'Hello Express!' });
})
