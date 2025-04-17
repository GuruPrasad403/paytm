import express from 'express'
import authMiddleware from '../Middleware/middleware.js'
import { UserModel } from '../models/user.model.js';
import { BankModel } from '../models/bank.model.js';

export const accountRouter = express.Router()

accountRouter.get("/balance", authMiddleware, async(req,res,next)=>{
    try {
        const username = req.username;
        const user = await UserModel.findOne({username})
        const findAccount = await BankModel.findOne({userId:user._id})
         res.status(200).json({
            msg:"Balance Fethced",
            balance:findAccount.balance
         })        
    } catch (error) {
        next(error)
    }
})


accountRouter.post("/transfer",authMiddleware,async(req,res,next)=>{
    try {
        const {to, amount} = req.body
        const username = req.username
        const findUser = await UserModel.findOne({
            username : to
        })
        if(!findUser) return   res.status(400).json({
            msg:  "Invalid account"
        })
        const user = await UserModel.findOne({username})
        const bankaccount = await BankModel.findOne({userId:user._id})
        if(parseInt(bankaccount?.balance) <= 0) return res.status(400).json({
            msg: "Insufficient balance"
        })
        bankaccount.balance = bankaccount.balance - parseInt(amount);
        const toBankAccount = await BankModel.findOne({userId:findUser._id})
        toBankAccount.balance =  toBankAccount.balance + parseInt(amount)
        await bankaccount.save()
        await toBankAccount.save()

        res.status(200).json({
            msg: "Transfer successful"
        })
    } catch (error) {
        next(error)
    }
})
