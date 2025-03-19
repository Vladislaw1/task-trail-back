import mongoose from 'mongoose'
import {IUser} from "./user.types";

const {Schema,model} = mongoose

const userSchema = new Schema<IUser>({
    login: {type: String, required: true, isEmail: true},
    password: {type: String, required: true, minlength: 8},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
})

export default model<IUser>('users', userSchema)