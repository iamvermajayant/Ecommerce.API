const User = require("../models/User");
const { verifyToken, verifyTokenWithAutorization, verifyTokenWithAdmin } = require("./verifyToken");

const router = require("express").Router();



router.put("/:id", verifyTokenWithAutorization, async(req,res) => {
    if(req.body.password){
        req.body.password = await bcrypt.hash(password, 10); 
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{new : true})

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error);
    }
})


//Delete the user 
router.delete('/:id', verifyTokenWithAdmin, async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error);
    }
})


//get the user only by admin 
router.get('/find/:id', verifyTokenWithAdmin, async (req, res)=> {
    try {
        const fetchedUser = await User.findById(req.params.id);
        const {...others} = fetchedUser._doc;

        res.status(200).json(others)
    } catch (error) {
        
    }
})


module.exports = router;