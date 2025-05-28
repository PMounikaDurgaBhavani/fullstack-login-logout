const db =require("../models/index");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv =require("dotenv");
dotenv.config();

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const result=await db.User.findOne({where:{email}});
        if(!result){
            return res.status(404).json("User not found");
        }
        const isMatch=await bcrypt.compare(password,result.password);
        if(!isMatch){
            return res.status(401).json("Invalid credentials");
        }
        const token=jwt.sign({id:result.id},process.env.jwt_secret,{expiresIn:'1h'})
        res.json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json("Error Occurred");
    }
}
module.exports=login;