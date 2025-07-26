const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  session:{type: mongoose.Schema.Types.ObjectId, ref:'Session'},
  prompt: { type: String, required: true },
  response: {type:String, require:true},
  relatedComponent: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
