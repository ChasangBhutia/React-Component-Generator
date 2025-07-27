const chatModel = require("../models/chatModel");
const sessionModel = require("../models/sessionModel");
const { callMistral } = require('../utils/openRouter');
const { extractCode } = require("../utils/extractCode");
const componentModel = require("../models/componentModel");

exports.saveChat = async (req, res) => {
  try {
    const { sessionId, prompt } = req.body;
    if (!sessionId || !prompt) return res.status(400).json({ success: false, errors: "All fields are required" });
    const message = [
      {
        role: "system",
        content:
          "You are a professional React component generator. Generate only clean and production-ready React component code. " +
          "Use only React and CSS with external css and no frameworks. Do not include wrapper files like App, index.js, or render functions. " +
          "Do not import css in the component file"+
          "If there are data needed like image or names or anything generate a random data and use for the same"
        },  
      {
        role: "user",
        content: prompt
      }
    ];

    const response = await callMistral(message);
    if (!response) return res.status(500).json({ success: false, errors: "Internal Server Error" });

    let session = await sessionModel.findById(sessionId).populate('chats');
    if (!session) return res.status(400).json({ success: false, errors: "No matching session" });

    const extractedCode = extractCode(response);

    let component;
    if (extractedCode) {
      component = await componentModel.create({
        user: req.user._id,
        code: extractedCode,
        title: prompt.slice(0, 50),
      });
    }

    let chat = await chatModel.create({
      user: req.user._id,
      session: sessionId,
      prompt,
      response,
      relatedComponent: component._id
    })
    if (!chat) return res.status(400).json({ success: false, errors: "Unable creating Chat" });
    session.chats.push(chat._id);
    await session.save();
    return res.status(201).json({ success: true, message: "Chat Saved", chat });


  } catch (err) {
    console.log("Error saving chat: ", err.message);
    return res.status(500).json({ success: false, errors: "Error saving chat" });
  }
};

exports.getChatsBySession = async (req, res) => {
  try {
    const chats = await chatModel.find({ session: req.params.sessionId }).populate({
      path: 'relatedComponent',
      model: 'Component'
    });

    if (!chats) return res.status(400).json({ success: false, errors: "Chats not found" });
    return res.status(200).json({ success: true, message: "Chat found", chats });
  } catch (err) {
    console.log("Error finding chats: ", err.message);
    return res.status(500).json({ success: false, errors: "Error fetching chats" });
  }
};
