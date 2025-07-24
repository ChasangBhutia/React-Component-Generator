const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.listen(PORT || 5000, ()=>{
    console.log(`Server is live on PORT: ${PORT}`);
})