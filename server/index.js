const express = require('express');
const app = express();
const users = require('./routes/users');
const orders= require('./routes/orders');
const products = require('./routes/products');
const login = require('./routes/login');
const item = require('./routes/item');

/*when localhost:8080/api/users is requested, 
the users.js file from routes folder will run 
which will return a JSON object containing the users from the users table.
This JSON obj is what the React app will parse*/
app.use('/api/users', users);

app.use('/api/orders', orders);

app.use('/api/products', products);

app.post('/api/login', login);

app.post('/api/item', item)

// app.get('/api', (req, res) => {
//     res.send('Hello world from express');
// });

app.listen(8080);