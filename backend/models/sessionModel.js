// models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  component: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
  codeHistory: [
    {
      code: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  active: { type: Boolean, default: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date }
});

module.exports = mongoose.model('Session', sessionSchema);
