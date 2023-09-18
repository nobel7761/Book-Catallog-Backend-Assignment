import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { UserFilterAbleFileds } from './users.constants';
import { UserService } from './users.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, UserFilterAbleFileds);
  const options = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, options);

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  getAllUsers,
};
