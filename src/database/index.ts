import mongoose from "mongoose";

let url = process.env.MONGO_URI || "";

export const ncrDB = mongoose.createConnection(url);
!ncrDB
  ? console.log("Error connecting to database")
  : console.log("Database connected successfully");
