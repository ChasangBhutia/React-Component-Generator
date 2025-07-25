const mongoose = require('mongoose');

const componentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    code: {
        type: String,
        required: true,
    },
    title: { type: String },  // optional title like "Hero section"
    tags: [String],           // e.g., ['button', 'navbar']
    createdAt: { type: Date, default: Date.now },
    lastEdited: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Component', componentSchema);