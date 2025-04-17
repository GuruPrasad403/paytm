import mongoose from "mongoose";

const BankSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required: true
    },
    balance :{
        type : Number,
        required: true
    }
})

export const BankModel =  mongoose.model("BankModel",  BankSchema)