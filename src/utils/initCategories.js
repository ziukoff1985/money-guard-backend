import { CategoryCollection } from '../db/models/category.js';

// Список категорій із ТЗ: одна категорія доходів і 10 категорій витрат
const categories = [
  { name: 'Incomes', type: 'income' },
  { name: 'Main expenses', type: 'expense' },
  { name: 'Products', type: 'expense' },
  { name: 'Car', type: 'expense' },
  { name: 'Self care', type: 'expense' },
  { name: 'Child care', type: 'expense' },
  { name: 'Household products', type: 'expense' },
  { name: 'Education', type: 'expense' },
  { name: 'Leisure', type: 'expense' },
  { name: 'Other expenses', type: 'expense' },
  { name: 'Entertainment', type: 'expense' },
];

// Функція для ініціалізації категорій у базі даних
export const initCategories = async () => {
  try {
    // Перевіряємо, чи є категорії в базі
    const count = await CategoryCollection.countDocuments();

    // Якщо категорій немає, вставляємо список
    if (count === 0) {
      await CategoryCollection.insertMany(categories);
      console.log('Categories initialized successfully');
    } else {
      console.log('Categories already exist, skipping initialization');
    }
  } catch (error) {
    // Логуємо помилку, якщо ініціалізація не вдалася
    console.error('Error initializing categories:', error);
    throw error; // Кидаємо помилку, щоб сервер міг обробити її
  }
};
