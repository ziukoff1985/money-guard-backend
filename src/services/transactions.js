import { TransactionsCollection } from '../db/models/transaction.js';
import { UsersCollection } from '../db/models/user.js';

export const getAllTransactions = async ({ userId }) => {
  const transactions = await TransactionsCollection.find({ userId });
  return { data: transactions };
};

export const createTransaction = async (userId, payload) => {
  const transaction = await TransactionsCollection.create({
    ...payload,
    userId,
  });

  const newBalance = await calculateBalance(userId);
  await UsersCollection.findByIdAndUpdate(userId, { balance: newBalance });

  return transaction;
};

export const updateTransaction = async (userId, transactionId, payload) => {
  const updatedTransaction = await TransactionsCollection.findOneAndUpdate(
    { _id: transactionId, userId },
    payload,
    { new: true },
  );

  const newBalance = await calculateBalance(userId);
  await UsersCollection.findByIdAndUpdate(userId, { balance: newBalance });

  return updatedTransaction;
};

export const deleteTransaction = async (userId, transactionId) => {
  const deletedTransaction = await TransactionsCollection.findOneAndDelete({
    _id: transactionId,
    userId,
  });

  const newBalance = await calculateBalance(userId);
  await UsersCollection.findByIdAndUpdate(userId, { balance: newBalance });

  return deletedTransaction;
};

export const calculateBalance = async (userId) => {
  const transactions = await TransactionsCollection.find({ userId });

  let balance = 0;

  transactions.forEach((tx) => {
    if (tx.transactionType === 'income') {
      balance += tx.summ;
    } else if (tx.transactionType === 'expense') {
      balance -= tx.summ;
    }
  });

  return balance;
};
