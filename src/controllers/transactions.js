import createHttpError from 'http-errors';
import {
  calculateBalance,
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from '../services/transactions.js';

export const getTransactionsController = async (req, res) => {
  const data = await getAllTransactions({ userId: req.user._id });

  res.json({
    status: 200,
    message: 'Successfully found transactions!',
    data,
  });
};

export const createTransactionController = async (req, res) => {
  const transaction = await createTransaction(req.user._id, req.body);
  const balance = await calculateBalance(req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a transaction!',
    data: { transaction, balance },
  });
};

export const patchTransactionController = async (req, res) => {
  const { transactionId } = req.params;

  const result = await updateTransaction(req.user._id, transactionId, req.body);

  if (!result) {
    throw createHttpError(404, 'Transaction not found');
  }

  const balance = await calculateBalance(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a transaction!',
    data: {
      transaction: result,
      balance,
    },
  });
};

export const deleteTransactionByIdController = async (req, res) => {
  const { transactionId } = req.params;
  const transaction = await deleteTransaction(req.user._id, transactionId);

  if (!transaction) {
    throw createHttpError(404, 'Transaction not found');
  }

  const balance = await calculateBalance(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Transaction deleted!',
    data: { balance },
  });
};
