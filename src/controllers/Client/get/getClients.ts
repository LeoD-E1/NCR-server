import { Request, Response } from "restify";
import ClientModel from "../../../database/models/clients.model";

const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await ClientModel.find();
    return res.json(clients);
  } catch (error) {
    console.log(error);
  }
};

export default getClients;
