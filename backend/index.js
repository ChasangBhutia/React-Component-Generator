const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT;

const ConnectDB = require("./config/db");
const llmRoutes = require("./routes/llmRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes")
const sessionRoutes = require("./routes/sessionRoutes")
const componentRoutes = require("./routes/componentRoutes")

const app = express();
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

ConnectDB();

app.use("/api/llm", llmRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/components", componentRoutes);

app.listen(PORT || 5000, ()=>{
    console.log(`Server is live on PORT: ${PORT}`);
})