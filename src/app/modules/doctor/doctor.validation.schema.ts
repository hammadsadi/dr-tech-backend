import { z } from 'zod';

// Create Doctor Validation Schema
const createDoctorValidationSchema = z.object({
  body: z.object({
    phone: z.string({
      required_error: 'Phone is required',
    }),
    specialization: z.string({
      required_error: 'Specialization is required',
    }),
    hospitalName: z.string({
      required_error: 'Hospital Name is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email address'),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
export const DoctorValidation = {
  createDoctorValidationSchema,
};
