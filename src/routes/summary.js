import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getSummaryController } from '../controllers/summary.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { summaryQuerySchema } from '../validation/summary.js';

const summaryRouter = Router();

summaryRouter.get(
  '/',
  authenticate,
  validateQuery(summaryQuerySchema),
  ctrlWrapper(getSummaryController),
);

export default summaryRouter;
