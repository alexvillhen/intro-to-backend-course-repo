import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [50, "Username must be less than 50 characters long"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: [isEmail, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be at least 8 characters long"],
            maxlength: [50, "Password must be less than 50 characters long"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
    }
)