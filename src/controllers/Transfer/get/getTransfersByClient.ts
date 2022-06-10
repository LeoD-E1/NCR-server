import { Request, Response } from "restify";
import {
  CLIENT_NUMBER_MANDATORY,
  TRANSFERS_NOT_FOUND,
} from "../../../constants/constants";
import TransferModel from "../../../database/models/transfers.model";

/**
 * • GET transferencias: retornará las transferencias realizadas por un cliente específico.
 * Parámetros obligatorios: número cliente.
 */
const getTransfersByClient = async (req: Request, res: Response) => {
  const { clientNumber } = req.params;

  if (!clientNumber) {
    return res.send(400, {
      message: CLIENT_NUMBER_MANDATORY,
    });
  }

  try {
    const transfersOfClient = await TransferModel.find({
      clientNumber: parseInt(clientNumber),
    });
    if (!transfersOfClient.length) {
      return res.send(404, {
        message: TRANSFERS_NOT_FOUND,
      });
    }
    return res.json(transfersOfClient);
  } catch (error) {
    return res.send(500, {
      message: error,
    });
  }
};

export default getTransfersByClient;
