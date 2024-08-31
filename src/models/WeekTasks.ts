import mongoose, { Schema, Types, model, models, mongo } from "mongoose"

interface WeekTasksI {
    name: string
    description: string
    completed: boolean
    createdBy: Date
    completedAt: Date
    category: string
    endDate: Date
    day: string
}

const WeekTasksSchema : Schema = new Schema({
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
        ref: 'User',
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
    day: {
        type: String,
        required: true
    },
}, {timestamps: true})

const WeekTask = mongoose.models.WeekTask || mongoose.model<WeekTasksI>('WeekTask', WeekTasksSchema)

export default WeekTask