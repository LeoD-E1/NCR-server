import { Request, Response } from "restify";
import AccountModel from "../../../database/models/accounts.model";
import ClientModel from "../../../database/models/clients.model";

/**
 * GET cuenta: retornará información de una cuenta y un cliente específico. Parámetros
 * obligatorios: número cliente, número de cuenta.
 */
const getAccountByClientNumber = async (req: Request, res: Response) => {
  const { clientNumber, accountNumber } = req.params;

  if (!clientNumber || !accountNumber) {
    return res.send(400, {
      message: "El número de cliente y de cuenta son obligatorios",
    });
  }

  try {
    const client = await ClientModel.findOne({ clientNumber });
    if (!client) {
      return res.send(404, {
        message: "No se encontró el cliente",
      });
    }
    const accountOfClient = await AccountModel.findOne({
      accountNumber: parseInt(accountNumber),
    });
    if (!accountOfClient) {
      return res.send(404, {
        message: `el cliente ${clientNumber} no posee cuenta la cuenta ${accountNumber}`,
      });
    }

    return res.json({
      data: { accountOfClient, client },
    });
  } catch (error) {
    console.log(error);
  }
};

export default getAccountByClientNumber;
