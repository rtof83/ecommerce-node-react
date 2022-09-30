// initial config
const express = require('express');
const cors = require('cors');
const { app } = require('./database/conn');

app.use(express.json());
app.use(cors());

// products routes
const deleteProduct = require('./routes/product/deleteProduct');
const getProductBySKU = require('./routes/product/getProductBySKU');
const getProducts = require('./routes/product/getProducts');
const patchProduct = require('./routes/product/patchProduct');
const postProduct = require('./routes/product/postProduct');

app.use('/products', [ postProduct,
                       getProducts,
                       deleteProduct,
                       patchProduct,
                       getProductBySKU ]);

// orders routes
const deleteOrder = require('./routes/order/deleteOrder');
const getOrderById = require('./routes/order/getOrderById');
const getOrders = require('./routes/order/getOrders');
const postOrder = require('./routes/order/postOrder');

app.use('/orders', [ deleteOrder,
                     getOrderById,
                     getOrders,
                     postOrder ]);

// customers routes
const deleteCustomer = require('./routes/customer/deleteCustomer');
const getCustomerById = require('./routes/customer/getCustomerById');
const getCustomers = require('./routes/customer/getCustomers');
const patchCustomer = require('./routes/customer/patchCustomer');
const postCustomer = require('./routes/customer/postCustomer');

app.use('/customers', [ postCustomer,
                       getCustomers,
                       deleteCustomer,
                       patchCustomer,
                       getCustomerById ]);
