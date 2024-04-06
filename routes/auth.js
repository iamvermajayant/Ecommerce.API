const router = require("express").Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
});



router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        console.log(`Searching for user: ${username}` .inverse); // Debugging log
        const user = await User.findOne({username});
        console.log(user);
        console.log(`User found: ${user ? 'Yes' : 'No'}` .underline.green); // Debugging log

        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: "Invalid password"});
        }

        
        // If the password matches, generate a JWT
        const token = jwt.sign({ id: user._id, isAdmin : user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '3d' // 24 hours
        });

        const {password: hashedPassword, ...others} = user._doc;

        // If the password matches then return 
        res.status(200).json({...others, token});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json(error);
    }
});


module.exports = router;