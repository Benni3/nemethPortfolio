import { useState } from 'react'
import Card from '../components/Card'
import SocialTags from '../components/SocialTags'

export default function Contact(){
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setError(null); setStatus('Sending…')

    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = { name: fd.get('name'), email: fd.get('email'), subject: fd.get('subject'), message: fd.get('message') }
    const API_BASE = 'https://nemeth-api.benjamin-nemeth05.workers.dev'

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if(!res.ok) throw new Error('Failed to send')
      setStatus('Thanks! I will get back to you.')
      form.reset()
    } catch (err:any){
      setError(err.message || 'Something went wrong')
      setStatus(null)
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-3xl font-bold">Contact</h1>
      <SocialTags />

      <Card className="mt-6">
        <form onSubmit={submit} className="space-y-4">
          <input name="name" placeholder="Your name" className="w-full border border-zinc-300/80 dark:border-zinc-700/80 rounded px-3 py-2 bg-transparent" required />
          <input type="email" name="email" placeholder="you@example.com" className="w-full border border-zinc-300/80 dark:border-zinc-700/80 rounded px-3 py-2 bg-transparent" required />
          <input name="subject" placeholder="Subject" className="w-full border border-zinc-300/80 dark:border-zinc-700/80 rounded px-3 py-2 bg-transparent" required />
          <textarea name="message" placeholder="Your message" rows={6} className="w-full border border-zinc-300/80 dark:border-zinc-700/80 rounded px-3 py-2 bg-transparent" required />
          <button className="px-4 py-2 rounded bg-accent text-white">Send</button>
        </form>
        {status && <p className="mt-4 text-green-600">{status}</p>}
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </Card>
    </section>
  )
}
