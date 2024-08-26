import mongoose, { model, Schema } from "mongoose"
import { boolean } from "zod"

interface UserI {
    name: string,
    email: string,
    password: string,
    token: string
}

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
        expires: 600
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.models.User || model<UserI>('User', UserSchema)

export default User