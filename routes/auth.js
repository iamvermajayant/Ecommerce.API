const router = require("express").Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 


    const newUser = new User({
        username,
        email,
        password : hashedPassword
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

module.exports = router;