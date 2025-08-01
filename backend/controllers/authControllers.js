const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    console.log("Entered Signup Controller.");
    
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) return res.status(400).json({ success: false, errors: "All fields are required" });

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(409).json({ success: false, errors: "User already exist. Please login." });
        const hashed = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ fullname, email, password: hashed });
        const token = generateToken(newUser.email, newUser._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: '/'
        });
        console.log(token);
        
        return res.status(201).json({ success: true, message: "User Created", newUser, token });
    } catch (err) {
        console.log("Error registering user: ", err.message);
        return res.status(400).json({ success: false, errors: "Something went wrong!" });
    }
}

module.exports.loginUser = async (req, res) => {
    console.log("Entered Login Controller.");
    
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, errors: "All fields are required" });
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ success: false, errors: "User not found" });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ success: false, errors: "Invalid Credentials!" });
        const token = generateToken(user.email, user._id);
        console.log(token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: '/'
        });
        return res.status(200).json({ success: true, message: "Logged In", user, token });
    } catch (err) {
        console.log("Error logging: ", err.message);
        return res.status(400).json({ success: false, errors: "Something went wrong!" });
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: "Logged Out!" });
}

module.exports.getUser = async (req, res) => {
    try {
        let user = await userModel.findById(req.user._id);
        if (!user) return res.status(404).json({ success: false, errors: "User not found" });
        return res.status(200).json({ success: true, message: "User found", user });
    } catch (err) {
        console.log("Error finding user: ", err.message);
        return res.status(400).json({ success: false, errors: "Something went wrong" })
    }
}