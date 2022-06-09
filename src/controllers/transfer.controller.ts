import { Request, Response } from "restify";
import TransferModel from "../database/models/transfers.model";
import verifyAccounts from "../utils/verifyAccounts";
import updateBalance from "../utils/updateBalance";
import {
  MANDATORY_PARAMETERS,
  ACCOUNTS_DOES_NOT_EXIST,
  UPDATE_BALANCE_ERROR,
  TRANSFER_SUCCESS,
  CLIENT_NUMBER_MANDATORY,
  TRANSFERS_NOT_FOUND,
} from "../constants/constants";

/**
 * POST transferencia: creará una nueva transferencia entre dos cuentas propias.
 * Parámetros obligatorios: monto, cuenta origen, cuenta destino.
 */
export const transferToOwnAccount = async (req: Request, res: Response) => {
  const { clientNumber, amount, fromAccount, toAccount } = req.body;

  if (!amount || !fromAccount || !toAccount) {
    return res.send(400, {
      status: 400,
      message: MANDATORY_PARAMETERS,
    });
  }

  try {
    const verify = await verifyAccounts(
      { fromAccount, toAccount },
      clientNumber
    );

    if (!verify) {
      return res.send(404, {
        status: 404,
        message: ACCOUNTS_DOES_NOT_EXIST,
      });
    }

    const updatedBalance = await updateBalance(
      { fromAccount, toAccount },
      amount
    );

    if (!updatedBalance) {
      return res.send(500, {
        status: 500,
        message: UPDATE_BALANCE_ERROR,
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
      message: TRANSFER_SUCCESS,
      data: transfer,
    });
  } catch (error) {
    return res.send(500, {
      status: 500,
      message: error,
    });
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
