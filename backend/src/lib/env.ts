import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(8787),
  CORS_ORIGIN: z.string().optional(),
  ENABLE_EMAIL: z.preprocess((v) => {
    if (typeof v === 'boolean') return v
    if (typeof v === 'string') return v.toLowerCase() === 'true'
    return false
  }, z.boolean().default(false)),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  FROM_EMAIL: z.string().email().optional()
})

type Env = z.infer<typeof EnvSchema>

export function loadEnv(): Env & { corsOrigins: string[] } {
  const parsed = EnvSchema.parse(process.env)
  const corsOrigins = (parsed.CORS_ORIGIN?.split(',').map(s => s.trim()).filter(Boolean)) ?? []
  return { ...parsed, corsOrigins }
}
