const chatModel = require("../models/chatModel");
const sessionModel = require("../models/sessionModel");
const { callMistral } = require('../utils/openRouter');

exports.saveChat = async (req, res) => {
  try {
    const { sessionId, prompt } = req.body;
    if (!sessionId || !prompt) return res.status(400).json({ success: false, errors: "All fields are required" });
    const message = [
      { role: "system", content: "You are a helpful Coder please provide best code" },
      { role: "user", content: prompt }
    ];
    const response = await callMistral(message);
    if(!response) return res.status(500).json({success:false, errors:"Internal Server Error"});

    let session = await sessionModel.findById(sessionId);
    if(!session) return res.status(400).json({success:false, errors:"No matching session"});
    let chat = await chatModel.create({
      user: req.user._id,
      session: sessionId,
      prompt,
      response
    })
    if (!chat) return res.status(400).json({ success: false, errors: "Unable creating Chat" });
    session.chats.push(chat._id);
    session.save();
    return res.status(201).json({success:true, message:"Chat Saved", chat});
    

  } catch (err) {
    console.log("Error saving chat: ", err.message);
    return res.status(500).json({ success: false, errors: "Error saving chat" });
  }
};

exports.getChatsBySession = async (req, res) => {
  try {
    const chats = await chatModel.find({ sessionId: req.params.sessionId });
    if (!chats) return res.status(400).json({ success: false, errors: "Chats not found" });
    return res.status(200).json({ success: true, message: "Chat found", chats });
  } catch (err) {
    console.log("Error finding chats: ",err.message);
    return res.status(500).json({ success: false, errors: "Error fetching chats" });
  }
};
