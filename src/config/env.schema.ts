import { z } from 'zod';
import { appSchema } from './schemas/app.schema';
import { authSchema } from './schemas/auth.schema';
import { databaseSchema } from './schemas/database.schema';
import { frontendSchema } from './schemas/frontend.schema';

export const envSchema = z
  .object({})
  .merge(appSchema)
  .merge(authSchema)
  .merge(databaseSchema)
  .merge(frontendSchema);

export type EnvVars = z.infer<typeof envSchema>;
