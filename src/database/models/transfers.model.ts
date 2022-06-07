import mongoose from "mongoose";
import { ncrDB } from "../index";

const transferSchema = new mongoose.Schema(
  {
    clientNumber: { type: mongoose.Schema.Types.Number, ref: "clients" },
    from: { type: mongoose.Schema.Types.Number, ref: "accounts" },
    to: { type: mongoose.Schema.Types.Number, ref: "accounts" },
    amount: { type: Number, required: true },
    date: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

const TransferModel = ncrDB.model("transfers", transferSchema);

export default TransferModel;
