const componentModel = require("../models/componentModel");

exports.createComponent = async (req, res) => {
    try {
        const { code, sessionId, name } = req.body;

        if (!code || !sessionId || !name) return res.status(400).json({ success: false, errors: "All fields are required" });

        const component = await componentModel.create({
            user: req.user._id,
            session: sessionId,
            code,
            name,
        });

        return res.status(201).json({ success: true, message: "Component Created", component });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, errors: "Failed to save component" });
    }
};

exports.getComponentsBySession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) return res.status(400).json({ success: false, errors: "Session id is missing" });
        const components = await componentModel.find({
            user: req.user._id,
            session: sessionId,
        }).sort({ createdAt: -1 });

        if (!components) return res.status(400).json({ success: false, errors: "Component not found" });

        return res.status(200).json({ success: true, message: "Component Found", components });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, errors: "Failed to fetch components" });
    }
};

exports.deleteComponent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ success: false, errors: "Id is missing" });
        const deleted = await componentModel.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!deleted) return res.status(404).json({ success: false, errors: "Component not found" });

        return res.status(200).json({ success: true, message: "Component deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "Failed to delete component" });
    }
};
