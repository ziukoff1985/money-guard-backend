import { Router } from 'express';
import transactionsRouter from './transactions.js';
import authRouter from './auth.js';
import categoriesRouter from './categories.js';
import currentUserRouter from './currentUser.js';

const router = Router();

router.use('/transactions', transactionsRouter);
router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/user', currentUserRouter);

export default router;
