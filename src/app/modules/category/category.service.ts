/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { CategorySearchableFields } from './category.constants';
import { ICategoryFilterRequest } from './category.interfaces';

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};

const getAllCategories = async (
  filters: ICategoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: CategorySearchableFields.map(field => ({
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

  const whereConditions: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.category.findMany({
    where: whereConditions,
    skip,
    include: {
      books: true,
    },
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { title: 'desc' },
  });

  const total = await prisma.category.count();
  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getCategoryById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id },
    include: {
      books: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Doesn't Exists");
  }

  return result;
};

const updateSingleCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category | null> => {
  const isExists = await prisma.category.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Doesn't Exists");
  }

  const result = await prisma.category.update({
    where: { id },
    data,
    include: {
      books: true,
    },
  });

  return result;
};

const deleteSingleCategory = async (id: string): Promise<Category | null> => {
  const isExists = await prisma.category.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Doesn't Exists");
  }

  const result = await prisma.category.delete({
    where: { id },
    include: {
      books: true,
    },
  });

  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateSingleCategory,
  deleteSingleCategory,
};
