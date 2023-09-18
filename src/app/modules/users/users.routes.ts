import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './users.controller';
import { UserValidation } from './users.validation';

const router = express.Router();

router.get('/:id', auth(UserRole.admin), UserController.getUserById);

router.get('/', auth(UserRole.admin), UserController.getAllUsers);

router.patch(
  '/:id',
  auth(UserRole.admin),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateSingleUser
);

router.delete('/:id', auth(UserRole.admin), UserController.deleteSingleUser);

export const UserRoutes = router;
