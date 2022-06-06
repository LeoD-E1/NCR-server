import mongoose from "mongoose";
import { ncrDB } from "../index";

const transferSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "account" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "account" },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const TransferModel = ncrDB.model("TransferModel", transferSchema);

export default TransferModel;
