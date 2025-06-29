import { z } from 'zod';

export const createAppointmentZodSchema = z.object({
  body: z.object({
    doctorId: z.string({
      required_error: 'Doctor ID is required',
    }),
    serviceId: z.string({
      required_error: 'Service ID is required',
    }),
    selectedDate: z
      .string({
        required_error: 'Selected date is required',
      })
      .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: 'Date must be in YYYY-MM-DD format',
      }),
    timeSlot: z
      .string({
        required_error: 'Time slot is required',
      })
      .refine((val) => /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/.test(val), {
        message: 'Time slot must be in HH:MM AM/PM format',
      }),
  }),
});

export const AppointmentValidationSchema = {
  createAppointmentZodSchema,
};
