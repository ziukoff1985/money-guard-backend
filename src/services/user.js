import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const updateUserData = async (userId, payload) => {
  if ('email' in payload || 'balance' in payload || 'password' in payload) {
    throw createHttpError(400, 'Updating email, password or balance is not allowed');
  }

  const updateData = {};

  if (payload.name) {
    updateData.name = payload.name;
  }
  
  const updatedUser = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    updateData,
    { new: true, context: 'query' }, // context: 'query' -> щоб повертався user
  ).select('-password');

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }
  return updatedUser;
};
