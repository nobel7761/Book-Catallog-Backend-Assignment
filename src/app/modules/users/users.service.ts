/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { UserSearchableFields } from './users.constants';
import { IUserFilterRequest } from './users.interfaces';

const getAllUsers = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: UserSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    include: {
      reviewAndRatings: true,
      orders: true,
    },
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { id: 'desc' },
  });

  const total = await prisma.user.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getUserById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
    include: {
      reviewAndRatings: true,
      orders: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }

  return result;
};

const updateSingleUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const isExists = await prisma.user.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }

  const result = await prisma.user.update({
    where: { id },
    data,
    include: {
      orders: true,
      reviewAndRatings: true,
    },
  });

  return result;
};

const deleteSingleUser = async (id: string): Promise<User | null> => {
  const isExists = await prisma.user.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Doesn't Exists");
  }

  const result = await prisma.user.delete({
    where: { id },
    include: {
      orders: true,
      reviewAndRatings: true,
    },
  });

  return result;
};

export const UserService = {
  getAllUsers,
  getUserById,
  updateSingleUser,
  deleteSingleUser,
};
