import express from 'express'
import { userValidation, userValidationUpdate } from '../utils/user.validation.js'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/user.model.js'
import { jwt } from '../config/config.js'
import JWT from 'jsonwebtoken'
import authMiddleware from '../Middleware/middleware.js'
import { BankModel } from '../models/bank.model.js'
export const userRouter  = express.Router()

userRouter.get('/', (req,res,next)=>{
    try {
        res.status(200).json({
            msg:"this is user router"
        })
    } catch (error) {
        next(error)
    }
})
        
userRouter.post("/signup", async(req,res,next)=>{
    try {
        const validation = userValidation.safeParse(req.body)
        if(!validation.success) return res.status(411).json({
            msg:" Incorrect inputs",
            error:validation.error.errors
        })
        const existingUser = await UserModel.findOne({username:validation.data.username})
        if (existingUser) {
            return res.status(411).json({
                msg: "Username  already taken"
            })
        }
        const hashedpassword = await bcrypt.hash(validation?.data?.password,10)
        const user = await UserModel.create({...validation.data, password:hashedpassword})
        const balance = Math.floor(1 + Math.random()* 10000)
        await BankModel.create({
            userId : user._id,
            balance:balance
        })
        const jwt_token = JWT.sign(user.username,jwt)
        res.status(200).json({
            msg:"User created successfully",
            jwt: jwt_token
        })
    } catch (error) {
        next(error)
    }
})

userRouter.post("/signin", async(req,res,next)=>{
    try {
        const {username,password} = req.body
        const findUser = await UserModel.findOne({username})
        if(!findUser) return res.status(411).json({
            msg:"User Not Exist"
        })
        const validatePassword = await bcrypt.compare(password,findUser.password)
        if(!validatePassword)  return res.status(411).json({
            msg:"Invalid Passwrod / Username"
        })
     
        const jwt_token = JWT.sign(findUser.username,jwt)
        res.status(200).json({
            msg:"User Signed in Sucessful",
            token: jwt_token,
            user:findUser
        })
    } catch (error) {
        next(error)
    }
})

// user Update 

userRouter.put("/", authMiddleware, async (req,res,next)=>{
    try {
        const validate = userValidationUpdate.safeParse(req.body)
        if(!validate) return res.status(411).json({
            msg:"Invalid Inputs",
            error:validate.error.errors
        })
        const username = req.username
        const findUser = await UserModel.findOne({username})
        findUser.username = validate.data.username || findUser.username;
        if( validate.data.password){
            const hashedpassword =  bcrypt.hash(validate.data.password,10) 
        findUser.password =  hashedpassword|| findUser.password
        }
        findUser.name = validate.data.name || findUser.name

        await findUser.save()
    } catch (error) {
        next(error)
    }
})

userRouter.get("/info", authMiddleware, async (req, res, next) => {
    try {
      const { name = "" } = req.query;
      const users = await UserModel.find({
        username: { $regex: name, $options: "i" }, 
      });
  
      res.json({ users });
    } catch (error) {
      next(error);
    }
  });


