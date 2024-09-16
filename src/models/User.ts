import mongoose, { model, Schema, Types } from "mongoose"
import { boolean } from "zod"

interface UserI {
    name: string,
    email: string,
    password: string,
    token: string
}
const defaultLogoUrl = 'https://res.cloudinary.com/decvyyzsl/image/upload/v1726183326/v8ulchu7ub5lrjo5g0he.jpg'

const UserSchema : Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: defaultLogoUrl.toString()
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'DailyTask'
        }
    ]
}, {timestamps: true})

const User = mongoose.models.User || model<UserI>('User', UserSchema)

export default User