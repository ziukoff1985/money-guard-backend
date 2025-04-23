import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateUserDataController } from '../controllers/user.js';

const updateUserRouter = Router();

updateUserRouter.patch(
  '/update-data',
  authenticate,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserDataController),
);

export default updateUserRouter;
