const jwt = require('jsonwebtoken');

module.exports.generateToken = (email,id)=>{
    return jwt.sign({email,_id:id}, process.env.JWT_SECRET_KEY);
}