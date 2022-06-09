import AccountModel from "../database/models/accounts.model";

declare interface Accounts {
  fromAccount: number;
  toAccount: number;
}

const updateBalance = async (accounts: Accounts, amount: number) => {
  const { fromAccount, toAccount } = accounts;
  try {
    const fromAccountUpdated = await AccountModel.findOneAndUpdate(
      { accountNumber: fromAccount },
      { $inc: { balance: -amount } },
      { new: true }
    );

    const toAccountUpdated = await AccountModel.findOneAndUpdate(
      { accountNumber: toAccount },
      { $inc: { balance: amount } },
      { new: true }
    );

    return { fromAccountUpdated, toAccountUpdated };
  } catch (error) {
    console.log(error);
  }
};

export default updateBalance;
