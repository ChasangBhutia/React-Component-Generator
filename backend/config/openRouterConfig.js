const axios = require("axios");

const openRouterConfig = axios.create({
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5000", 
        "Content-Type": "application/json"
    }
})

module.exports = openRouterConfig;