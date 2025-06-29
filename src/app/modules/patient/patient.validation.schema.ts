import { z } from 'zod';

export const createPatientValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email address',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
    phone: z.string({
      required_error: 'Phone number is required',
    }),
    age: z
      .number({
        required_error: 'Age is required',
      })
      .min(1, {
        message: 'Age must be at least 1',
      }),
    gender: z.enum(['male', 'female', 'other'], {
      required_error: 'Gender is required',
    }),
  }),
});

export const PatientsValidationSchemas = {
  createPatientValidationSchema,
};
