import { Request, Response } from "restify";
import ClientModel from "../../../database/models/clients.model";

const createClient = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.send(400, {
      message: "Name is required",
    });
  }

  try {
    const client = await ClientModel.create({
      name,
      clientNumber: Math.floor(Math.random() * 1000000),
    });
    return res.json(client);
  } catch (error) {
    console.log(error);
  }
};

export default createClient;
