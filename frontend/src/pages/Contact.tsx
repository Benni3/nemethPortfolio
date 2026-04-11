import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Card from '../components/Card'
import SocialTags from '../components/SocialTags'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setStatus('Sending...')

    const form = e.currentTarget
    const fd = new FormData(form)

    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      subject: String(fd.get('subject') || ''),
      message: String(fd.get('message') || ''),
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus(null)
      setError('Email service is not configured.')
      return
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        payload,
        PUBLIC_KEY
      )

      setStatus('Message sent successfully.')
      form.reset()
    } catch (err) {
      console.error(err)
      setStatus(null)
      setError('Failed to send message.')
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-3xl font-bold">Contact</h1>

      <div className="mt-4">
        <SocialTags />
      </div>

      <Card className="mt-6 p-6">
        <form onSubmit={submit} className="space-y-4">
          <input
            name="name"
            placeholder="Your name"
            className="w-full rounded-xl border border-zinc-300/80 bg-transparent px-3 py-2 dark:border-zinc-700/80"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-zinc-300/80 bg-transparent px-3 py-2 dark:border-zinc-700/80"
            required
          />

          <input
            name="subject"
            placeholder="Subject"
            className="w-full rounded-xl border border-zinc-300/80 bg-transparent px-3 py-2 dark:border-zinc-700/80"
            required
          />

          <textarea
            name="message"
            placeholder="Your message"
            rows={6}
            className="w-full rounded-xl border border-zinc-300/80 bg-transparent px-3 py-2 dark:border-zinc-700/80"
            required
          />

          <button className="rounded-xl bg-accent px-4 py-2 text-white">
            Send
          </button>
        </form>

        {status && <p className="mt-4 text-green-600">{status}</p>}
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </Card>
    </section>
  )
}