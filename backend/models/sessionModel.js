// models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
  title:String,
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  components: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }],
  active: { type: Boolean, default: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date }
});

module.exports = mongoose.model('Session', sessionSchema);
