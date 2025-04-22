import { UsersCollection } from '../db/models/user.js';

export const getCurrentUserController = async (req, res) => {
  const userId = req.user._id;

  const currentUser = await UsersCollection.findById(userId);

  res.json({
    status: 200,
    message: 'Successfully fetched current user',
    data: currentUser,
  });
};
