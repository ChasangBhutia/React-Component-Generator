const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req,res)=>{
    const {fullname, email, password} = req.body;
    if(!fullname || !email || !password) return res.status(400).json({success:false, errors:"All fields are required"});

    try{
        const existingUser = await userModel.findOne({email});
        if(existingUser) return res.status(409).json({success:false, errors:"User already exist. Please login."});
        const hashed = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({fullname, email, password:hashed});
        const token = generateToken(newUser.email, newUser._id);
        res.cookie('token', token);
        return res.status(201).json({success:true, message:"User Created", newUser});
    }catch(err){
        console.log("Error registering user: ", err.message);
        return res.status(400).json({success:false, errors:"Something went wrong!"});
    }
}

module.exports.loginUser = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({success:false, errors:"All fields are required"});
    try{
        const user = await userModel.findOne({email});
        if(!user) return res.status(404).json({success:false, errors:"User not found"});
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) return res.status(400).json({success:false, errors:"Invalid Credentials!"});
        const token = generateToken(user.email, user._id);
        res.cookie('token', token);
        return res.status(200).json({success:true, message:"Logged In", user});
    }catch(err){
        console.log("Error logging: ", err.message);
        return res.status(400).json({success:false,errors:"Something went wrong!"});
    }
}

module.exports.logout = (req, res)=>{
    res.clearCookie('token');
    return res.status(200).json({success:true, message:"Logged Out!"});
}

module.exports.getUser = async (req,res)=>{
    try{
        let user = await userModel.findById(req.user._id);
        if(!user) return res.status(404).json({success:false, errors:"User not found"});
        return res.status(200).json({success:true, message:"User found", user});
    }catch(err){
        console.log("Error finding user: ",err.message);
        return res.status(400).json({success:false, errors:"Something went wrong"})
    }
}