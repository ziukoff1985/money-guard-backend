import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import createHttpError from 'http-errors';
import { updateUserPhoto } from '../services/updatePhoto.js';

export const patchUserPhotoController = async (req, res, next) => {
  const userId = req.user._id;
  const photo = req.file;
  const updateData = req.body;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const updatedFields = {
    ...updateData,
  };

  if (photoUrl) {
    updatedFields.photo = photoUrl;
  }

  const result = await updateUserPhoto(userId, updatedFields);
  if (!result) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully updated user photo!',
    data: result,
  });
};
