import mongoose from 'mongoose';
const { Schema } = mongoose;

export const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
});