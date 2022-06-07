import AccountModel from "../database/models/accounts.model";

declare interface Accounts {
  fromAccount: number;
  toAccount: number;
}

const verifyAccounts = async (accounts: Accounts, clientNumber: number) => {
  const { fromAccount, toAccount } = accounts;

  const fromAccountExists = await AccountModel.find({
    accountNumber: fromAccount,
    clientNumber,
  });

  const toAccountExists = await AccountModel.find({
    accountNumber: toAccount,
    clientNumber,
  });

  if (!fromAccountExists || !toAccountExists) {
    return false;
  }
  return true;
};

export default verifyAccounts;
