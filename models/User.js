import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema({
    name : {
        type : String,
        required
    }, 
    email : {
        type : String,
        required
    },
    password : {
        type : String , 
        required
    } ,
    organisationId : {
        type: String ,
        required
    },
    role : {
        type : String,
        enum : ["member" , "manager" , "admin"],
        default : "member",
        required
    }

})

export default mongoose.model("UserModel" , UserModelSchema)