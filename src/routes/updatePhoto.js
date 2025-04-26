import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { patchUserPhotoController } from '../controllers/updatePhoto.js';

const updatePhotoRouter = Router();

updatePhotoRouter.patch(
  '/photo',
  authenticate,
  upload.single('photo'),
  ctrlWrapper(patchUserPhotoController),
);

export default updatePhotoRouter;
