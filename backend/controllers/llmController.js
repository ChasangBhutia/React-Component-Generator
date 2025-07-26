const { callMistral } = require('../utils/openRouter');

module.exports.generateSolution = async (req, res) => {
    const { prompt } = req.body;
    

    if (!prompt) return res.status(400).json({ error: "Prompt is required!" });
    try {
        const messages = [
            { role: "system", content: "You are a helpful Coder please provide best code" },
            { role: "user", content: prompt }
        ];

        const result = await callMistral(messages);
        res.status(200).json({ component: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
