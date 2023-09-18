import { z } from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required' }),
  }),
});

const updateCategoryZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required' }),
  }),
});

export const CategoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
};
