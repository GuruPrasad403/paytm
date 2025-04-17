import mongoose from "mongoose";

export default async function ConneetToDB(DB_URL){
    try{
        await mongoose.connect(DB_URL);
        console.log("Data Base Conneted ")
        return true
    }catch(e){
        return false
        
    }
}