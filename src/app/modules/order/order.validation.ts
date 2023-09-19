import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({ required_error: 'Book Id is Required' }),
        quantity: z.number({ required_error: 'Book Quantity is Required' }),
      })
    ),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
