import mongoose from "mongoose";

const { MONGODB_ADDON_URI } = process.env;
let url =
  process.env.MONGODB_ADDON_URI || "mongodb://localhost:27017/ncr-server";

export const ncrDB = mongoose.createConnection(url);
