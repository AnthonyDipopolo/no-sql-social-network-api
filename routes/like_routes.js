const router = require('express').Router();
const {Planet, Like} = require('../models');

// adding a like to a planet 
router.put('/like/:planet_id', async (req, res) => {
    const planet_id = req.params.planet_id;
    
    const like = await Like.create({
        planet: planet_id
    });

    //update one planet using the update
    const planet = await Planet.findByIdAndUpdate(planet_id, {
        $push : {
            likes: like._id
        }
    }, {new: true});

    res.json(planet);

});

//get likes for a planet 
router.get('/likes/:planet_id', async (req, res) => {
    const planet = await Planet.findById(req.params.planet_id).populate('likes');

    res.json({
        planet,
        likes: planet.likes.length
    });
});

//remove like from a planet
router.put('/likes/remove/:planet_id', async (req, res) => {
    const like_id = req.body.like_id;

    const planet = await Planet.findByIdAndUpdate(req.params.planet_id, {
        $pull: {
            likes: like_id
        }
    }, {new: true});

    res.json(planet);
});


module.exports = router;