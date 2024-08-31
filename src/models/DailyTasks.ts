import mongoose, { Schema, Types, model, models, mongo } from "mongoose"

interface DailyTasks {
    name: string
    description: string
    completed: boolean
    completedAt: Date
    category: string
    endDate: Date
}

const DailyTaskSchema : Schema = new Schema({
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
        type: Types.ObjectId,
        ref: 'User'
    },
    completedAt: {
        type: Date,
    },
    category: {
        type: String,
    },
    endDate: {
        type: Date,
    },
}, {timestamps: true})

const DailyTask = mongoose.models.DailyTask || model<DailyTasks>("DailyTask", DailyTaskSchema)

export default DailyTask