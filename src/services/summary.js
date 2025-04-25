import { TransactionsCollection } from '../db/models/transaction.js';
// import { Category } from '../db/models/category.js';

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
    // Підтягуємо дані категорії
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    // Розгортаємо масив category
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
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
        title: { $first: '$category.title' },
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
    const { total, title } = item;

    const categoryObj = {
      categoryId: categoryId.toString(),
      title: title || 'Unknown',
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
