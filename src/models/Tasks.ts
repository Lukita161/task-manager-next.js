import mongoose, { Schema, Types, model, models, mongo } from "mongoose"

interface TaskI {
    name: string
    description: string
    completed: boolean
    completedAt: Date
    category: string
    endDate: Date
}

const TaskSchema : Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Types.ObjectId
    },
    completedAt: {
        type: Date,
    },
    category: {
        type: String,
    },
    endDate: {
        type: Date,
    }
}, {timestamps: true})

const Task = mongoose.models.Task || model<TaskI>("Task", TaskSchema)

export default Task