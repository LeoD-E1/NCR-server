import { Request, Response } from "restify";
import { ACCOUNTS_NOT_FOUND } from "../../../constants/constants";
import AccountModel from "../../../database/models/accounts.model";

/**
 * GET cuentas: retornará las cuentas bancarias de un cliente específico por su número
 * de cuenta. Parámetros obligatorios: número de cliente.
 */
const getAccountsByClient = async (req: Request, res: Response) => {
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

export default getAccountsByClient;
