import projects from './data/projects.json'

export interface Env {
  ALLOWED_ORIGIN?: string
  CONTACT_TO_EMAIL?: string
}

type ContactBody = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const origin = env.ALLOWED_ORIGIN || '*'

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(origin)
      })
    }

    if (request.method === 'GET' && url.pathname === '/api/health') {
      return new Response(JSON.stringify({ ok: true }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(origin)
        }
      })
    }

    if (request.method === 'GET' && url.pathname === '/api/projects') {
      return new Response(JSON.stringify(projects), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
          ...corsHeaders(origin)
        }
      })
    }

    if (request.method === 'POST' && url.pathname === '/api/contact') {
      let body: ContactBody | null = null

      try {
        body = await request.json()
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(origin)
          }
        })
      }

      if (!body?.name || !body?.email || !body?.subject || !body?.message) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(origin)
          }
        })
      }

      // For now: log it. Later you can wire Resend/MailChannels/etc.
      console.log('Contact submission', {
        to: env.CONTACT_TO_EMAIL ?? 'not-set',
        from: body.email,
        subject: `myportfolio:${body.subject}`,
        name: body.name,
        message: body.message
      })

      return new Response(JSON.stringify({ ok: true }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(origin)
        }
      })
    }

    return new Response('Not found', {
      status: 404,
      headers: corsHeaders(origin)
    })
  }
}