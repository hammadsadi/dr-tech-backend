import { z } from 'zod';

const createHospitalZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    floor: z.string({
      required_error: 'Floor is required',
    }),
  }),
});
export const HospitalValidation = {
  createHospitalZodSchema,
};
