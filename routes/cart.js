const Cart = require('../models/Cart');
const { verifyToken, verifyTokenWithAutorization, verifyTokenWithAdmin } = require("./verifyToken");
const router = require("express").Router();


//create
router.post('/', verifyToken, async (req, res)=> {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
})


//update the cart 
router.put('/:id', verifyTokenWithAutorization, async (req,res)=> {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, {
                $set : req.body,
            },
            {new : true}
        );

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
})



//Delete the product 
router.delete('/:id', verifyTokenWithAutorization, async (req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...")
    } catch (error) {
        res.status(500).json(error);
    }
})


//get User cart
router.get('/find/:id', async (req, res)=> {
    try {
        const CartDetails = await Cart.findOne(req.params.id);
        res.status(200).json(CartDetails);
    } catch (error) {
        res.status(500).json(error);
    }
})


//Get all carts 

router.get('/', verifyTokenWithAdmin, async(req, res)=> {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
})




module.exports = router;