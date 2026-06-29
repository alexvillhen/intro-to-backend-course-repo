import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";


const isEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

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
        }
    },
    {timestamps: true}
)

//encrypt passwords before saving users
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})

//compare passwords
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}


export const User = mongoose.model("User", userSchema); // "User" is the collection name in the database