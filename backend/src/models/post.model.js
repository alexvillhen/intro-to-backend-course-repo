import mongoose, {Schema } from "mongoose";

const modelSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            unique: false,
            lowercase: false,
            trim: true
        },
        description:{
            type: String,
            required: true,
            unique: false,
            lowercase: false,
            trim: true
        },
        age:{
            type: Number,
            required: true,
            unique: false,
            trim: true
        },
    },
    {
        timestamps: true
    }
)


export const Post = mongoose.model('Post', modelSchema);