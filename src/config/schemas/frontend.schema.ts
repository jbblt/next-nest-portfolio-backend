import { z } from 'zod';

export const frontendSchema = z.object({
  FRONTEND_URL: z
    .string({
      required_error: 'FRONTEND_URL is required',
      invalid_type_error: 'FRONTEND_URL must be a string',
    })
    .url('FRONTEND_URL must be a valid URL'),
});
