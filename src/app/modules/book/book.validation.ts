import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required' }),
    author: z.string({ required_error: 'Author Name is Required' }),
    price: z.number({ required_error: 'Price is Required' }),
    genre: z.string({ required_error: 'Genre is Required' }),
    publicationDate: z.string({
      required_error: 'Publication Date is Required',
    }),
    categoryId: z.string({ required_error: 'Category Id is Required' }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
