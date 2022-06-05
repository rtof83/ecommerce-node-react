// config inicial
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
// const app = express();
const { conn, app } = require('./database/conn');

app.use(express.json());
app.use(cors());

// rotas da API
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/order', orderRoutes);

const customerRoutes = require('./routes/customerRoutes');
app.use('/customer', customerRoutes);

// depois do db

// app.use(
//   express.urlencoded({
//     extended: true,
//   }),
// )

// mongoose.connect(conn)
//     .then(() => {
//         console.log('DB connected...')
//         app.listen(3001)
//     })
//     .catch((err) => console.log(err));

app.get('/', (_, res) => {
  res.json({ message: 'Hello Express!' })
})
