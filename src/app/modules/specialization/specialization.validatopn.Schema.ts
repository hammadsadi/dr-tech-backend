import { z } from 'zod';

export const createSpecializationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
  }),
});

export const SpecializationValidationSchemas = {
  createSpecializationSchema,
};
