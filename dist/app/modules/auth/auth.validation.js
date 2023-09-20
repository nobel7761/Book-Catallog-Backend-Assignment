"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is Required' }),
        email: zod_1.z.string({ required_error: 'Email is Required' }),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
        role: zod_1.z.enum([...Object.values(client_1.UserRole)], {}),
        contactNo: zod_1.z.string({ required_error: 'Contact Number is Required' }),
        address: zod_1.z.string({ required_error: 'Address is Required' }),
        profileImg: zod_1.z.string({ required_error: 'Profile Image is Required' }),
    }),
});
const signInZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is Required' }),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
    }),
});
exports.AuthValidation = {
    signUpZodSchema,
    signInZodSchema,
};
