import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  deleteTransactionByIdController,
  getTransactionsController,
  patchTransactionController,
} from '../controllers/transactions.js';
import { Router } from 'express';
import {
  createTransactionSchema,
  updateTransactionSchema,
} from '../validation/transaction.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createTransactionController } from '../controllers/transactions.js';
import { authenticate } from '../middlewares/authenticate.js';

const transactionsRouter = Router();

transactionsRouter.get(
  '/',
  authenticate,
  ctrlWrapper(getTransactionsController),
);

transactionsRouter.post(
  '/',
  authenticate,
  validateBody(createTransactionSchema),
  ctrlWrapper(createTransactionController),
);

transactionsRouter.patch(
  '/:transactionId',
  isValidId,
  authenticate,
  validateBody(updateTransactionSchema),
  ctrlWrapper(patchTransactionController),
);

transactionsRouter.delete(
  '/:transactionId',
  isValidId,
  authenticate,
  ctrlWrapper(deleteTransactionByIdController),
);

export default transactionsRouter;
