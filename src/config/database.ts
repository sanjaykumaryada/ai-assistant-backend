import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("Mongo uri is missing!");
  }
  await mongoose.connect(uri);
  console.log("Mongodb connected successfully");
}
