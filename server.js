const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

const db = require('./db/connection');

//Middleware
app.use(express.json()); //opens the channel so req.body can recieve information

//Routes
const thought_routes = require('./routes/thought_routes');
const user_routes = require('./routes/user_routes');


app.use('/api', [thought_routes, user_routes]) //presets all the routes with api

db.once('open', () => {
    app.listen(PORT, () => {
        console.log('Server started on Port %s', PORT)
    });
});