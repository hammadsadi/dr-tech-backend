import { z } from 'zod';

// Create Availability Schema
export const createAvailabilitySchema = z.object({
  body: z.object({
    day: z.enum(
      [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      {
        required_error: 'Day is required and must be a valid day of the week',
      },
    ),
    slots: z
      .array(
        z
          .string({
            required_error: 'Each slot must be a string',
          })
          .min(1, 'Slot must not be empty'),
      )
      .optional()
      .default([]),
  }),
});

// Update Availability Schema
export const updateAvailabilitySchema = z.object({
  body: z.object({
    day: z
      .enum([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ])
      .optional(),
    slots: z
      .array(
        z
          .string({
            required_error: 'Each slot must be a string',
          })
          .min(1, 'Slot must not be empty'),
      )
      .optional(),
  }),
});

export const AvailabilityValidationSchema = {
  createAvailabilitySchema,
  updateAvailabilitySchema,
};
