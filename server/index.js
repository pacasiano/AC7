const express = require('express');
const app = express();
const users = require('./routes/users');
const orders= require('./routes/orders');
const products = require('./routes/products');
const login = require('./routes/login');
const item = require('./routes/item');
const cart = require('./routes/cart');
const checkout = require('./routes/checkout');
const inventory_in = require('./routes/inventory_in');
const suppliers = require('./routes/suppliers');

app.use(express.urlencoded( { extended: true } ));

/*when localhost:8080/api/users is requested, 
the users.js file from routes folder will run 
which will return a JSON object containing the users from the users table.
This JSON obj is what the React app will parse*/
app.use('/api/users', users);

app.use('/api/orders', orders);

app.use('/api/products', products);

app.use('/api/login', login);

app.use('/api/item', item);

app.use('/api/cart', cart);  

app.use('/api/checkout', checkout);

app.use('/api/inventory_in', inventory_in);

app.use('/api/suppliers', suppliers)


app.listen(8080, () => {
    console.log('Server running at port 8080')
});