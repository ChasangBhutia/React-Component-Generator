const openRouterConfig = require('../config/openRouterConfig');

module.exports.callMistral = async (message) => {
    try {
        const response = await openRouterConfig.post("/chat/completions", {
            model: "mistralai/mistral-7b-instruct",
            messages:message
        })
        return response.data.choices[0].message.content;;
    } catch (err) {
        console.error("Error calling Mistral:", err?.response?.data || err.message);
        throw new Error("Failed to get response from Mistral.");
    }
}