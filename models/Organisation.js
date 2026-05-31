import mongoose from "mongoose";

const OrganisationSchema = new mongoose.Schema({
    name : {
        type : String,
        required
    }
})


export default mongoose.model("Organisation" , OrganisationSchema)