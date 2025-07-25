const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const ConnectDB = require("./config/db");
const llmRoutes = require("./routes/llmRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

ConnectDB();

app.use("/api/llm", llmRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT || 5000, ()=>{
    console.log(`Server is live on PORT: ${PORT}`);
})