const express = require('express');
const connectDB = require('./utils/dbConnect');
const colors = require('colors');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const cors = require('cors');


const app = express();

connectDB();

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);



const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}` .rainbow);
});
