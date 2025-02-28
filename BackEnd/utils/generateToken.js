const jwt= require('jsonwebtoken')
const ENV_VARS = require('../config/vars')
exports.generateToken=(userId,role,res)=>{
    const token=jwt.sign({userId,role},ENV_VARS.JWT_SECRET,{expiresIn:"2h"})
    res.cookie("jwt",token,{
        maxAge:2*60*60*1000,
        httpOnly:true,
        sameSite:ENV_VARS.MODE=='production'?'None':'Strict',
        secure:ENV_VARS.MODE!=="development",
    })
    return token;
}
