import mongoose from "mongoose";
import { ncrDB } from "../index";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
    },
  ],
});

const ClientModel = ncrDB.model("ClientModel", clientSchema);
export default ClientModel;
