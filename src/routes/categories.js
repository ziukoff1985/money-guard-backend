import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCategoriesController } from '../controllers/categories.js';
import { authenticate } from '../middlewares/authenticate.js';

const categoriesRouter = Router();

categoriesRouter.get('/', authenticate, ctrlWrapper(getCategoriesController));

export default categoriesRouter;
