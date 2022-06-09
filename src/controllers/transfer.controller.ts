import { Request, Response } from "restify";
import TransferModel from "../database/models/transfers.model";
import verifyAccounts from "../utils/verifyAccounts";
import AccountModel from "../database/models/accounts.model";
import updateBalance from "../utils/updateBalance";

/**
 * POST transferencia: creará una nueva transferencia entre dos cuentas propias.
 * Parámetros obligatorios: monto, cuenta origen, cuenta destino.
 */
export const transferToOwnAccount = async (req: Request, res: Response) => {
  const { clientNumber, amount, fromAccount, toAccount } = req.body;

  if (!amount || !fromAccount || !toAccount) {
    return res.send(400, {
      status: 400,
      message: "Algunos parámetros son obligatorios",
    });
  }

  try {
    const verify = await verifyAccounts(
      { fromAccount, toAccount },
      clientNumber
    );

    if (!verify) {
      return res.send(404, {
        message: "Alguna de las cuentas no existe o no pertenece al cliente",
      });
    }

    const updatedBalance = await updateBalance(
      { fromAccount, toAccount },
      amount
    );

    if (!updatedBalance) {
      return res.send(500, {
        message: "Error al actualizar el saldo de las cuentas",
      });
    }

    const transfer = await TransferModel.create({
      clientNumber,
      from: fromAccount,
      to: toAccount,
      amount,
    });

    return res.json({
      status: 200,
      message: "Transferencia exitosa",
      data: transfer,
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * • GET transferencias: retornará las transferencias realizadas por un cliente específico.
 * Parámetros obligatorios: número cliente.
 */
export const getTransfersByClient = async (req: Request, res: Response) => {
  const { clientNumber } = req.params;

  if (!clientNumber) {
    return res.send(400, {
      message: "El número de cliente es obligatorio",
    });
  }

  try {
    const transfersOfClient = await TransferModel.find({
      clientNumber: parseInt(clientNumber),
    });
    if (!transfersOfClient.length) {
      return res.send(404, {
        message: "No se encontraron transferencias",
      });
    }
    return res.json(transfersOfClient);
  } catch (error) {
    console.log(error);
  }
};
