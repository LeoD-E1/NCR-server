import mongoose from "mongoose";
import { ncrDB } from "../index";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clientNumber: { type: Number, required: true, unique: true },
});

const ClientModel = ncrDB.model("clients", clientSchema);
export default ClientModel;
