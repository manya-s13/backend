import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const data = await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB Connected: ${data.connection.host}`);
    } catch (error) {
        console.error(error);
    }
}
