import nodemailer from 'nodemailer'

export type Mailer = {
  send: (opts: {
    from?: string
    to: string
    subject: string
    text?: string
    html?: string
  }) => Promise<void>
}

export function createMailer(
  enabled: boolean,
  cfg: {
    host?: string
    port?: number
    user?: string
    pass?: string
    from?: string
  }
): Mailer {
  if (!enabled) {
    return {
      async send(opts) {
        console.log('[contact:stub]', {
          to: opts.to,
          subject: opts.subject,
          text: opts.text
        })
      }
    }
  }

  const port = cfg.port ?? 587

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: cfg.user && cfg.pass
      ? { user: cfg.user, pass: cfg.pass }
      : undefined,
  })

  // 🔍 Debug: verify connection
  transporter.verify((error, success) => {
    if (error) {
      console.error('SMTP verify failed:', error)
    } else {
      console.log('SMTP ready:', success)
    }
  })

  return {
    async send(opts) {
      await transporter.sendMail({
        from: cfg.from ?? opts.from ?? cfg.user,
        ...opts
      })
    }
  }
}