// const express = require('express');
// const app = express();

const DB_USER = 'rtof';
const DB_PASS = 'mongopass';
const DB_CLUSTER = 'api';
const DB_NAME = 'enafood';
const DB_URL = 'nejcmva.mongodb.net';

const conn = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`;

// `mongodb+srv://${user}:${pass}@url-shortener.wvm9z.mongodb.net/${DB_NAME}?retryWrites=true&w=majority
// `mongodb+srv://rtof:<password>@api.nejcmva.mongodb.net/?retryWrites=true&w=majority`


const mongoose = require('mongoose');
const express = require('express');
const app = express();
mongoose.connect(conn)
    .then(() => {
        console.log('DB connected...')
        app.listen(3001)
    })
    .catch((err) => console.log(err));


// module.exports = conn

module.exports = { conn, app }
