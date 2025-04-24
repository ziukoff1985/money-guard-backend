import { TransactionsCollection } from '../db/models/transaction.js';
import { calculateBalance } from './transactions.js';

export const getSummaryByPeriod = async (userId, period) => {
  // Розбиваємо period на рік і місяць
  const [year, month] = period.split('-').map(Number);

  // Формуємо діапазон дат
  const startDate = new Date(year, month - 1, 1); // Наприклад, 2024-11-01
  const endDate = new Date(year, month, 1); // Наприклад, 2024-12-01

  // Агрегація транзакцій
  const report = await TransactionsCollection.aggregate([
    // Фільтруємо за користувачем і періодом
    {
      $match: {
        userId,
        date: { $gte: startDate, $lt: endDate },
      },
    },
    // Приєднуємо назви категорій
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    // Розпаковуємо масив category
    {
      $unwind: '$category',
    },
    // Групуємо за типом транзакції та категорією
    {
      $group: {
        _id: {
          transactionType: '$transactionType',
          categoryId: '$categoryId',
          categoryTitle: '$category.title',
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
    const { transactionType, categoryId, categoryTitle } = item._id;
    const total = item.total;

    const categoryObj = {
      categoryId: categoryId.toString(),
      title: categoryTitle,
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

  // Отримуємо баланс користувача
  const balance = await calculateBalance(userId);

  return { ...result, balance };
};
