import dotenv from 'dotenv'
// import path from 'node:path'

// dotenv.config({
//   path: path.resolve(__dirname, '../.env')
// })

import path from 'node:path'
import fs from 'node:fs'

const envPath = path.resolve(__dirname, '../../.env')
console.log('Trying to load env from:', envPath)
console.log('Env file exists:', fs.existsSync(envPath))

const dotenvResult = dotenv.config({ path: envPath })
console.log('dotenv result error:', dotenvResult.error)

import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { loadEnv } from './lib/env'
import { createMailer } from './lib/mailer'
import health from './routes/health'
import projects from './routes/projects'
import contactRoute from './routes/contact'

const env = loadEnv()
console.log('ENV CHECK', {
  ENABLE_EMAIL: env.ENABLE_EMAIL,
  SMTP_HOST: env.SMTP_HOST,
  SMTP_USER: env.SMTP_USER,
  FROM_EMAIL: env.FROM_EMAIL,
})
const app = express()

app.use(helmet())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('tiny'))

if (env.corsOrigins.length) {
  app.use(cors({ origin: env.corsOrigins }))
}

app.use('/api', health)
app.use('/api', projects)

const limiter = rateLimit({ windowMs: 60_000, max: 10 })
app.use('/api/contact', limiter)

const mailer = createMailer(env.ENABLE_EMAIL, {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  user: env.SMTP_USER,
  pass: env.SMTP_PASS,
  from: env.FROM_EMAIL
})

app.use('/api', contactRoute(mailer, env.FROM_EMAIL || env.SMTP_USER || 'example@example.com'))

// Serve frontend build in production
if (env.NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, '../../frontend/dist')
  app.use(express.static(dist))
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(env.PORT, () => {
  console.log(`backend listening on http://localhost:${env.PORT}`)
})
