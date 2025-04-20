import express, { Router } from 'express';

import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import {
  registerUserCtrlr,
  loginUserCtrlr,
  refreshUsersSessionCtrlr,
  logoutUserCtrlr,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

authRouter.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserCtrlr),
);

authRouter.post(
  '/login',
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserCtrlr),
);

authRouter.post('/refresh', ctrlWrapper(refreshUsersSessionCtrlr));

authRouter.post('/logout', ctrlWrapper(logoutUserCtrlr));

export default authRouter;
