import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true,
        trim : true,
    },
    username: {
        type:String,
        required: true,
        trim : true,
        unique: true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    }

})

const UserModel =  mongoose.model("UserModel", userSchema)

export {UserModel}