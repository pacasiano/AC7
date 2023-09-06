const express = require('express');
const app = express();
const users = require('./routes/users');
const orders= require('./routes/orders');

/*when localhost:8080/api/users is requested, 
the users.js file from routes folder will run 
which will return a JSON object containing the users from the users table.
This JSON obj is what the React app will parse*/
app.use('/api/users', users);

app.use('/api/orders', orders)

app.get('/api', (req, res) => {
    res.send('Hello world from express');
});

app.listen(8080);