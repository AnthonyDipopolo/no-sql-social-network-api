const router = require('express').Router();
const { User } = require('../models');

router.post('/register', async (req, res) => {
    try {  
        const user = await User.create(req.body);

        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(401).send({
            message: err.message
        });
    }

});

//login user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        }).populate('favorites')
        if(!user) throw new Error('No user found with that username');

        const valid = await user.validatePass(req.body.password);
        if (!valid) throw new Error('Your password is incorrect');

        res.json(user); //send the new user object

    } catch (err) {
        res.status(401).send({
            message: err.message
        });
    }
});

router.put('/user/favorite', async (req, res) => {
    const { user_id, planet_id} = req.body;

    const user = await User.findByIdAndUpdate(user_id, {
        $push: {
            favorites: planet_id
        }
    }, {new: true});

    res.json(user);
});

module.exports = router;