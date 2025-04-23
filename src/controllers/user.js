import { updateUserData } from '../services/user.js';

export const updateUserDataController = async (req, res) => {
  const userId = req.user._id;
  const updateData = req.body;

  const updatedUser = await updateUserData(userId, updateData);

  res.json({
    status: 200,
    message: 'Successfully updated user data!',
    data: updatedUser,
  });
};
