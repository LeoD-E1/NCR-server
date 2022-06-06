import mongoose from "mongoose";
import { ncrDB } from "../index";

const { Schema, Types } = mongoose;

const accountSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    balance: { type: Number, required: true },
    clientNumber: { type: String, required: true },
    transfers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TransferModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AccountModel = ncrDB.model("AccountModel", accountSchema);

export default AccountModel;
