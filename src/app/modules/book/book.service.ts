/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchableFields } from './book.constants';
import { IBookFilterRequest } from './book.interfaces';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllCategories = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BookSearchableFields.map(field => ({
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

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    include: {
      category: true,
      reviewAndRatings: true,
    },
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { title: 'desc' },
  });

  const total = await prisma.book.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getBookById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: { id },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Doesn't Exists");
  }

  return result;
};

const getBookByCategoryId = async (id: string): Promise<Book[] | null> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Doesn't Exists");
  }

  return result;
};

const updateSingleBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book | null> => {
  const isExists = await prisma.book.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Doesn't Exists");
  }

  const result = await prisma.book.update({
    where: { id },
    data,
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });

  return result;
};

const deleteSingleBook = async (id: string): Promise<Book | null> => {
  const isExists = await prisma.book.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Doesn't Exists");
  }

  const result = await prisma.book.delete({
    where: { id },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });

  return result;
};

export const BookService = {
  createBook,
  getAllCategories,
  getBookById,
  getBookByCategoryId,
  updateSingleBook,
  deleteSingleBook,
};
