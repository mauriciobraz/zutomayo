import { z } from 'zod';

const DotenvSchema = z.object({
  NODE_ENV: z.enum(['DEVELOPMENT', 'PRODUCTION']).default('DEVELOPMENT'),
  LOG_LEVEL: z.enum(['0', '1', '2', '3', '4', '5', '6']).transform(Number),
  DISCORD_TOKEN: z.string().regex(/^[\w-]+\.[\w-]+\.[\w-]+$/),
  DATABASE_URL: z.string().url(),
});

export const { NODE_ENV, LOG_LEVEL, DISCORD_TOKEN } = DotenvSchema.parse(
  process.env
);

export type DotenvType = z.infer<typeof DotenvSchema>;
export default DotenvSchema;
