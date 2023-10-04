import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  auth(UserRole.customer),
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

router.get(
  '/',
  auth(UserRole.admin, UserRole.customer),
  OrderController.getAllOrders
);

router.get(
  '/:id',
  auth(UserRole.admin, UserRole.customer),
  OrderController.getSingleOrder
);

export const OrderRoutes = router;
