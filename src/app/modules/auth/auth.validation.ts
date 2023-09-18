import { UserRole } from '@prisma/client';
import { z } from 'zod';

const signUpZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required' }),
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
    role: z.enum([...Object.values(UserRole)] as [string, ...string[]], {}),
    contactNo: z.string({ required_error: 'Contact Number is Required' }),
    address: z.string({ required_error: 'Address is Required' }),
    profileImg: z.string({ required_error: 'Profile Image is Required' }),
  }),
});

const signInZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
  }),
});

export const AuthValidation = {
  signUpZodSchema,
  signInZodSchema,
};
