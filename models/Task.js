import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    status: {
        type: String,
        enum: [
            "TODO",
            "IN_PROGRESS",
            "IN_REVIEW",
            "DONE",
            "BLOCKED"
        ],
        default: "pending",
        required: true
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ,
    dueDate: {
        type: Date,

    }
    ,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    , organisationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
      } ,
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        default: "MEDIUM"
      }, 
      description: {
        type: String
      },
      




})

taskSchema.index({ status: 1 });
taskSchema.index({ assignee: 1 });
taskSchema.index({ dueDate: 1 });

export default mongoose.model("Task", taskSchema)