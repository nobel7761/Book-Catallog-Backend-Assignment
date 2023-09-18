import { z } from 'zod';

const updateUserZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required' }),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
};
