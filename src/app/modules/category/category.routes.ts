import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  auth(UserRole.admin),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);

router.get('/:id', CategoryController.getCategoryById);

router.get('/', CategoryController.getAllCategories);

router.patch(
  '/:id',
  auth(UserRole.admin),
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.updateSingleCategory
);

router.delete(
  '/:id',
  auth(UserRole.admin),
  CategoryController.deleteSingleCategory
);

export const CategoryRoutes = router;
