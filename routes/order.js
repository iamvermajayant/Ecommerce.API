const Order = require('../models/Order');
const { verifyToken, verifyTokenWithAutorization, verifyTokenWithAdmin } = require("./verifyToken");
const router = require("express").Router();


//create the order 
router.post('/', verifyToken, async (req, res)=> {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        console.log(savedOrder);
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
})


//update the order
router.put('/:id', verifyTokenWithAdmin, async (req,res)=> {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, {
                $set : req.body,
            },
            {new : true}
        );

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
})



//Delete the Order 
router.delete('/:id', verifyTokenWithAdmin, async (req,res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...")
    } catch (error) {
        res.status(500).json(error);
    }
})


//get User Order
router.get('/find/:id', verifyTokenWithAutorization, async (req, res)=> {
    try {
        const Orders = await Order.find(req.params.id);
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error);
    }
})


//Get all Orders

router.get('/', verifyTokenWithAdmin, async(req, res)=> {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
})


// Get monthly income 

router.get("/income", verifyTokenWithAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    
    try {
        const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
        },
        },
        {
        $group: {
            _id: "$month",
            total: { $sum: "$sales" },
            },
        },
    ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;