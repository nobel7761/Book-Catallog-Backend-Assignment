import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './users.controller';

const router = express.Router();
router.get('/:id', auth(UserRole.admin), UserController.getUserById);
router.get('/', auth(UserRole.admin), UserController.getAllUsers);

export const UserRoutes = router;
