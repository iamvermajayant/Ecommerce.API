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


//GET All the user 
router.get('/alluser', async (req,res)=> {
    const query = req.query.new;
    try {
        const allUser = query ? await User.find().limit(2).sort({_id : -1}) : await User.find();
        res.status(200).json(allUser);
    } catch (error) {
        res.status(500).json(error);
    }
})



//user Stats 
router.get('/stats' , verifyTokenWithAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            {$match : {createdAt : {$gte : lastYear}}},
            {
                $project : {
                    month : {$month : "$createdAt"},
                },
            },
            {
                $group : {
                    _id : "$month",
                    total : {$sum : 1},
                },
            },
        ])

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;