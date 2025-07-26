const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }, sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    }],
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chats'
    }],
    components: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Components'
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);