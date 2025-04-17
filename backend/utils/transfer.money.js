import mongoose from 'mongoose';
import {BankModel} from '../models/bank.model.js'
const transferFunds = async (fromAccountId, toAccountId, amount) => {
    // Decrement the balance of the fromAccount
	  await BankModel.findByIdAndUpdate(fromAccountId, { $inc: { balance: -amount } });

    // Increment the balance of the toAccount
    await BankModel.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } });
}


export default transferFunds;