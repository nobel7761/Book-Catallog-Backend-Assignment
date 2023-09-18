import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const signUpAuth = async (payload: User): Promise<User> => {
  const isExists = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists!');
  }

  const result = await prisma.user.create({
    data: payload,
  });

  return result;
};

export const AuthService = {
  signUpAuth,
};
