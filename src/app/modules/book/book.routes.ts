import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  auth(UserRole.admin),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get('/:id', BookController.getBookById);

router.get('/:id/category', BookController.getBookByCategoryId);

router.get('/', BookController.getAllCategories);

router.patch(
  '/:id',
  auth(UserRole.admin),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateSingleBook
);

router.delete('/:id', auth(UserRole.admin), BookController.deleteSingleBook);

export const BookRoutes = router;
