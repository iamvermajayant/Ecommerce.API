const express = require('express');
const connectDB = require('./utils/dbConnect');
const colors = require('colors');

const app = express();

connectDB();

app.get('/', (req, res) => {
 res.send('Hello, World!');
});


const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}` .rainbow);
});
