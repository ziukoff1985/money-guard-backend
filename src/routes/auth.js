import express, {Router} from 'express';

import {registerUserSchema, loginUserSchema} from '../validation/auth.js';
import {registerUserCtrlr, loginUserCtrlr, refreshUsersSessionCtrlr, logoutUserCtrlr} from '../controllers/auth.js';
import {validateBody} from '../middlewares/validateBody.js';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';

const router = Router();
const jsonParser = express.json({ type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',});

router.post('/auth/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserCtrlr));

router.post('/auth/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserCtrlr));

router.post('/auth/refresh', ctrlWrapper(refreshUsersSessionCtrlr));

router.post('/auth/logout', ctrlWrapper(logoutUserCtrlr));

export default router;