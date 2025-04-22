import { Router } from 'express';
import transactionsRouter from './transactions.js';
import authRouter from './auth.js';
import categoriesRouter from './categories.js';

const router = Router();

router.use('/transactions', transactionsRouter);
router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);

export default router;
