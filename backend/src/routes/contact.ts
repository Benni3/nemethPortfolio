import { Router } from 'express'
import { z } from 'zod'
import type { Mailer } from '../lib/mailer'

const r = Router()

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(5000)
})

type Contact = z.infer<typeof ContactSchema>

export default function contactRoute(mailer: Mailer, toEmail: string) {
  r.post('/contact', async (req, res) => {
    const parsed = ContactSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
    const data: Contact = parsed.data

    try {
      await mailer.send({
        to: toEmail,
        subject: `myportfolio:${data.subject}`,
        text: `${data.name} <${data.email}>\n\n${data.message}`
      })
      res.status(202).json({ ok: true })
    } catch (err) {
      console.error('contact send failed', err)
      res.status(500).json({ error: 'Failed to send' })
    }
  })

  return r
}
