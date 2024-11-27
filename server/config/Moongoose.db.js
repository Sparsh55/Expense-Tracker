import mongoose from "mongoose";

const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB using Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectUsingMongoose;
