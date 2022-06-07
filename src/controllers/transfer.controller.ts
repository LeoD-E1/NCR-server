import { Request, Response } from "restify";
import ClientModel from "../database/models/clients.model";
import TransferModel from "../database/models/transfers.model";
/**
 * POST transferencia: creará una nueva transferencia entre dos cuentas propias.
 * Parámetros obligatorios: monto, cuenta origen, cuenta destino.
 */
export const transferToOwnAccount = () => {};
/**
 * • GET transferencias: retornará las transferencias realizadas por un cliente específico.
 * Parámetros obligatorios: número cliente.
 */
export const getTransfersByClient = async (req: Request, res: Response) => {
  const { clientNumber } = req.params;
  const transfersOfClient = await TransferModel.find({
    clientNumber: parseInt(clientNumber),
  });
  if (!transfersOfClient.length) {
    return res.send(404, {
      message: "No se encontraron transferencias",
    });
  }
  return res.json(transfersOfClient);
};
