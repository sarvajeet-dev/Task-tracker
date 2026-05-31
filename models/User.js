import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema({
    name : {
        type : String,
       required: true    }, 
    email : {
        type : String,
       required: true
    },
    password : {
        type : String , 
       required: true
    } ,
    organisationId : {
        type: String ,
       required: true
    },
    role : {
        type : String,
        enum : ["member" , "manager" , "admin"],
        default : "member",
       required: true
    }

})

export default mongoose.model("UserModel" , UserModelSchema)