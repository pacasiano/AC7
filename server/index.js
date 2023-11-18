const express = require('express');
const app = express();
const orders= require('./routes/orders');
const products = require('./routes/product.js');
const login = require('./routes/login');
const item = require('./routes/item');
const cart = require('./routes/cart');
const checkout = require('./routes/checkout');
const inventory_in = require('./routes/inventory_in');
const suppliers = require('./routes/suppliers');
const profile = require('./routes/profile.js');
const address = require('./routes/address.js');
const account = require('./routes/account.js');
const customer = require('./routes/customer.js')
const order_item = require('./routes/order_item.js');
const employee = require('./routes/employee.js');
const inventory_out = require('./routes/inventory_out.js');

app.use(express.urlencoded( { extended: true } ));

/*when localhost:8080/api/*file is requested, 
the *file.js from routes folder will run 
which will return a JSON object containing the data from the requested table.
This JSON obj is what the React app will parse*/

app.use('/api/orders', orders);

app.use('/api/product', products);

app.use('/api/login', login);

app.use('/api/item', item);

app.use('/api/cart', cart);  

app.use('/api/checkout', checkout);

app.use('/api/inventory_in', inventory_in);

app.use('/api/suppliers', suppliers);

app.use('/api/profile', profile);

app.use('/api/address', address);

app.use('/api/account', account);

app.use('/api/customer', customer)

app.use('/api/order_item', order_item);

app.use('/api/employee', employee);

app.use('/api/inventory_out', inventory_out);


app.listen(8080, () => {
    console.log('Server running at port 8080')
});