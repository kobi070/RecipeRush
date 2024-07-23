import mongoose from "mongoose";
import { ConnectOptions } from "./interfaces";

let isConnected = false; // Track connection status



// Asynchronously connect to MongoDB
export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    // Connection options for mongoose
    const options: ConnectOptions = {
      dbName: "share_recipe",
      useNewUrlParser: true,
      // useUnifiedTopology: true, // Uncomment if needed
    };

    // Connect to MongoDB 
    await mongoose.connect(process.env.MONGODB_URI as string, options);

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    // Log any connection errors
    console.error("Error connecting to MongoDB:", error);
  }
};
