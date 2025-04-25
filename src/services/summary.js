import { TransactionsCollection } from '../db/models/transaction.js';
// import { calculateBalance } from './transactions.js';

export const getSummaryByPeriod = async (userId, period) => {
  // Розбиваємо period на рік і місяць
  const [year, month] = period.split('-').map(Number);

  // Формуємо діапазон дат
  const startDate = new Date(year, month - 1, 1); // Наприклад, 2025-04-01
  const endDate = new Date(year, month, 1); // Наприклад, 2025-05-01

  // Агрегація транзакцій
  const report = await TransactionsCollection.aggregate([
    // Фільтруємо за користувачем і періодом
    {
      $match: {
        userId,
        date: { $gte: startDate, $lt: endDate },
      },
    },
    // Групуємо за типом транзакції та категорією
    {
      $group: {
        _id: {
          transactionType: '$transactionType',
          categoryId: '$categoryId',
        },
        total: { $sum: '$summ' },
      },
    },
  ]);

  // Формуємо результат
  const result = {
    income: [],
    expense: [],
    totalIncome: 0,
    totalExpense: 0,
  };

  report.forEach((item) => {
    const { transactionType, categoryId } = item._id;
    const total = item.total;

    const categoryObj = {
      categoryId: categoryId.toString(),
      total,
    };

    if (transactionType === 'income') {
      result.income.push(categoryObj);
      result.totalIncome += total;
    } else {
      result.expense.push(categoryObj);
      result.totalExpense += total;
    }
  });

  // Обчислюємо баланс за період
  const balance = result.totalIncome - result.totalExpense;

  return { ...result, balance };
};
