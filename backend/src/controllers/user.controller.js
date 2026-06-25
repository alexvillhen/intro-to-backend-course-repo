import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        //check if user already exists
        const existing = await User.findOne({email: email.toLowerCase()});
        if (existing){
            return res.status(400).json({message: "User already exists"});
        }
    } catch (error) {
        
    }
}