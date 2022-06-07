import { Request, Response } from "restify";
import ClientModel from "../database/models/clients.model";

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await ClientModel.find();
    return res.json(clients);
  } catch (error) {
    console.log(error);
  }
};

export const createClient = async (req: Request, res: Response) => {
  const { name, clientNumber } = req.body;
  if (!name || !clientNumber) {
    return res.send(400, {
      message: "Los parámetros son obligatorios",
    });
  }

  try {
    const client = await ClientModel.create({
      name,
      clientNumber,
    });
    return res.json(client);
  } catch (error) {
    console.log(error);
  }
};
