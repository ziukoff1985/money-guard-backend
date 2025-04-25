import createHttpError from 'http-errors';
import { TransactionsCollection } from '../db/models/transaction.js';
import { UsersCollection } from '../db/models/user.js';

export const getAllTransactions = async ({ userId }) => {
  const transactions = await TransactionsCollection.find({ userId });
  return transactions;
};

export const createTransaction = async (userId, payload) => {
  const { transactionType, categoryId } = payload;

  const INCOME_CATEGORY_ID = '6804058087a5c385d8e99714';

  if (transactionType === 'income' && categoryId !== INCOME_CATEGORY_ID) {
    throw createHttpError(
      400,
      'Income transactions must use the "Incomes" category',
    );
  }
  if (transactionType === 'expense' && categoryId === INCOME_CATEGORY_ID) {
    throw createHttpError(
      400,
      'Expense transactions cannot use the "Incomes" category',
    );
  }

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
