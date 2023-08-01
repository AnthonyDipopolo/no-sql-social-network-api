const router = require('express').Router();
const { Router } = require('express');
const {Planet} = require('../models');

//Get all planets
router.get('/planets', async (req, res) => {
    const planets = await Planet.find({});
    res.json(planets);
// console.log(planets);
});

//Create a planet
router.post('/planet', async  (req,res) => {
    //use the planet model to create a planet with the req.body properties
    //has to match our schema model

    const planet = await Planet.create(req.body);

    //send the new planet object back as the response
    res.json(planet);
});

//get planet by name 
router.get('/planets/:name', async (req, res)=> {
    const planet = await Planet.findOne({
        name: {
            $regex : req.params.name,
            $options:'i'
        }
    });

    if (planet) return res.json(planet); //use return to avoid the else

    res.json({message:'Planet Not Found'});
});

//planet stats route
router.get('/stats', async (req, res) => {
    const stats = await Planet.aggregate([
        {
            $group:
            {
                _id: null,
                count:{$sum: 1}, //for each planet add one to sum
                totalLikes: {
                    $sum:{ //sum the size of the likes array
                        $size: '$likes'
                    }
                }
            
            }}
    ]); //method used to create some custome data from the panets collection

    res.json(stats);
});

module.exports = router;