const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT;

const ConnectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes")
const sessionRoutes = require("./routes/sessionRoutes")
const componentRoutes = require("./routes/componentRoutes")

const app = express();

app.use(cookieParser())
app.use(cors({
    origin:'https://react-component-generator-five.vercel.app',
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

ConnectDB();

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/components", componentRoutes);

app.listen(PORT || 5000, ()=>{
    console.log(`Server is live on PORT: ${PORT}`);
})
