import { Router } from 'express';
import { getCurrentUserController } from '../controllers/currentUser.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const currentUserRouter = Router();

currentUserRouter.get(
  '/current',
  authenticate,
  ctrlWrapper(getCurrentUserController),
);

export default currentUserRouter;
