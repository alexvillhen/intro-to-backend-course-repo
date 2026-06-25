import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const {connection} = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`\nConnected to MongoDB: ${connection.host}`);
    } catch (error) {
        console.log(`\nError connecting to MongoDB: ${error.message}`);
        process.exit(1); // 1 is for failure
    }
}

export default connectDB;