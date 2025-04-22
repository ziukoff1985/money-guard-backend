import { getCategories } from '../services/categories.js';

export const getCategoriesController = async (req, res) => {
  const categories = await getCategories();

  res.status(200).send({
    status: 200,
    message: 'Successfully fetched categories!',
    data: categories,
  });
};
