const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

const db = require('./db/connection');

//Middleware
app.use(express.json()); //opens the channel so req.body can recieve information

//Routes
const planet_routes = require('./routes/planet_routes');
const like_routes = require('./routes/like_routes');
const user_routes = require('./routes/user_routes');


app.use('/api', [planet_routes, like_routes, user_routes]) //presets all the routes with api

db.once('open', () => {
    app.listen(PORT, () => {
        console.log('Server started on Port %s', PORT)
    });
});