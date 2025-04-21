import { Category } from '../db/models/category.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    const incomes = categories
      .filter(category => category.title === 'Incomes')
      .map(category => category.title);

    const expenses = categories
      .filter(category => category.title !== 'Incomes')
      .map(category => category.title);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched categories!',
      data: {
        incomes,
        expenses,
      },
    });
  } catch (error) {
    next(error);
  }
};
