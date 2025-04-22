import { Category } from '../db/models/category.js';

export const getCategories = async () => {
  const categories = await Category.find();

  const income = categories.filter((category) => category.title === 'Incomes');
  const expense = categories.filter((category) => category.title !== 'Incomes');
  return { income, expense };
};
