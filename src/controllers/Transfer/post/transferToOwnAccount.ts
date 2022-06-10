import { Request, Response } from "restify";
import {
  UPDATE_BALANCE_ERROR,
  MANDATORY_PARAMETERS,
  TRANSFER_SUCCESS,
  ACCOUNTS_DOES_NOT_EXIST,
} from "../../../constants/constants";
import TransferModel from "../../../database/models/transfers.model";
import updateBalance from "../utils/updateBalance";
import verifyAccounts from "../utils/verifyAccounts";

/**
 * POST transferencia: creará una nueva transferencia entre dos cuentas propias.
 * Parámetros obligatorios: monto, cuenta origen, cuenta destino.
 */
const transferToOwnAccount = async (req: Request, res: Response) => {
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

export default transferToOwnAccount;
