import mongoose from "mongoose";

const { DB_MONGO_URI = "mongodb://localhost:27017/ncr-server" } = process.env;

export const ncrDB = mongoose.createConnection(DB_MONGO_URI);
