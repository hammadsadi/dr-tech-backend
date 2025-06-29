import { z } from 'zod';

// Create Service Validation Schema
const createServiceValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string().optional(),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(50),
    duration: z
      .number({
        required_error: 'Duration is required',
      })
      .min(15),
  }),
});
// Update Service Validation Schema
const updateServiceValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .optional(),
    description: z.string().optional(),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(50)
      .optional(),
    duration: z
      .number({
        required_error: 'Duration is required',
      })
      .min(15)
      .optional(),
  }),
});

export const ServiceValidationSchemas = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};
