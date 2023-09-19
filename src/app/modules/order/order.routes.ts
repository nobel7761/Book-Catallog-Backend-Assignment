import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

export const OrderRoutes = router;
