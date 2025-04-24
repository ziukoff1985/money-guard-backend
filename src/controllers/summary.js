import createHttpError from 'http-errors';
import { getSummaryByPeriod } from '../services/summary.js';

export const getSummaryController = async (req, res) => {
  const { period } = req.query;
  const userId = req.user._id;

  try {
    const summary = await getSummaryByPeriod(userId, period);

    res.json({
      status: 200,
      message: `Successfully retrieved summary for period ${period}!`,
      income: summary.income,
      expense: summary.expense,
      totalIncome: summary.totalIncome,
      totalExpense: summary.totalExpense,
      balance: summary.balance,
    });
  } catch {
    throw createHttpError(500, 'Server error');
  }
};
