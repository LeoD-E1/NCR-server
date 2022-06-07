import { Request, Response } from "restify";
import AccountModel from "../database/models/accounts.model";
import ClientModel from "../database/models/clients.model";
import { ACCOUNTS_NOT_FOUND } from "../constants/constants";

/**
 * GET cuentas: retornará las cuentas bancarias de un cliente específico por su número
 * de cuenta. Parámetros obligatorios: número de cliente.
 */
export const getAccountsByClient = async (req: Request, res: Response) => {
  try {
    const { clientNumber } = req.params;

    if (!clientNumber) {
      return res.send(400, {
        message: "El número de cliente es obligatorio",
      });
    }

    const accountsOfClient = await AccountModel.find({
      clientNumber: parseInt(clientNumber),
    });
    if (!accountsOfClient.length) {
      return res.send(404, {
        message: ACCOUNTS_NOT_FOUND,
      });
    }
    return res.json(accountsOfClient);
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET cuenta: retornará información de una cuenta y un cliente específico. Parámetros
 * obligatorios: número cliente, número de cuenta.
 */
export const getAccountByClientNumber = async (req: Request, res: Response) => {
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
