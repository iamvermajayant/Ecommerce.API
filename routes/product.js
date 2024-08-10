const Product = require('../models/Product');
const { verifyToken, verifyTokenWithAutorization, verifyTokenWithAdmin } = require("./verifyToken");
const router = require("express").Router();


//create
router.post('/', verifyTokenWithAdmin, async (req, res)=> {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})


//update 
router.put('/:id', verifyTokenWithAdmin, async (req,res)=> {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                $set : req.body,
            },
            {new : true}
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})



//Delete the product 
router.delete('/:id', verifyTokenWithAdmin, async (req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...")
    } catch (error) {
        res.status(500).json(error);
    }
})


//get the products by id
router.get('/find/:id', async (req, res)=> {
    try {
        const Products = await Product.findById(req.params.id);
        res.status(200).json(Products);
    } catch (error) {
        res.status(500).json(error);
    }
})


//GET All the products 
router.get('/', async (req,res)=> {
    const qnew = req.query.new;
    const qcategory = req.query.categories;
    try {
        let products;
        if(qnew){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }
        else if(qcategory){
            products = await Product.find({categories : {
                $in:[qcategory],
            }})
        }
        else{
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
})





module.exports = router;