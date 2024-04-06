const express = require('express');
const connectDB = require('./utils/dbConnect');
const colors = require('colors');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

const app = express();

connectDB();


app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);


const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}` .rainbow);
});
