import mongoose, { model, Schema, Types } from "mongoose"

interface WeekDay {
    day: string
}

const WeekDaySchema:Schema = new Schema({
    day: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'WeekTask'
        }
    ]
})

export const WeekDay = mongoose.models.WeekDay || model<WeekDay>('WeekDay', WeekDaySchema)