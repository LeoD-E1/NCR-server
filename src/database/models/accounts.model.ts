import mongoose from "mongoose";
import { ncrDB } from "../index";

const { Schema, Types } = mongoose;

const accountSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accountNumber: { type: Number, required: true },
  balance: { type: Number, required: true },
  clientNumber: { type: mongoose.Schema.Types.Number, ref: "clients" },
});
const AccountModel = ncrDB.model("accounts", accountSchema);

export default AccountModel;
