import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Project } from '../lib/projects'
import Card from '../components/Card'
import ImageCarousel from '../components/ImageCarousel'

type LoadState =
  | { kind: 'loading' }
  | { kind: 'notfound' }
  | { kind: 'loaded'; project: Project }

export default function Project(){
  const { slug } = useParams()
  const [state, setState] = useState<LoadState>({ kind: 'loading' })

  useEffect(() => {
    if (!slug) return

    setState({ kind: 'loading' })
    const API_BASE = 'https://nemeth-api.benjamin-nemeth05.workers.dev'
    fetch(`${API_BASE}/api/projects`)
      .then(async (r) => {
        if (r.status === 404) {
          setState({ kind: 'notfound' })
          return
        }
        const data = await r.json()
        setState({ kind: 'loaded', project: data })
      })
      .catch(() => setState({ kind: 'notfound' }))
  }, [slug])

  if(state.kind === 'loading') {
    return <section className="mx-auto max-w-5xl px-4 py-14"><p>Loading…</p></section>
  }

  if(state.kind === 'notfound') {
    return <section className="mx-auto max-w-5xl px-4 py-14"><p>Project not found.</p></section>
  }

  const project = state.project

  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{project.summary}</p>
        </div>
        <div className="flex items-center gap-2">
          {project.status ? (
            <span className="rounded-full bg-white/[0.10] px-3 py-1 text-xs text-zinc-700 backdrop-blur-2xl dark:bg-white/[0.06] dark:text-zinc-300">
              {project.status}
            </span>
          ) : null}
          {project.date ? (
            <span className="rounded-full bg-white/[0.10] px-3 py-1 text-xs text-zinc-700 backdrop-blur-2xl dark:bg-white/[0.06] dark:text-zinc-300">
              {project.date}
            </span>
          ) : null}
        </div>
      </div>

      {project.images?.length ? (
        <div className="mt-8">
          <ImageCarousel images={project.images} />
        </div>
      ) : null}

      <Card className="mt-8">
        <div className="prose dark:prose-invert">
          <h2>Description</h2>
          <p>{project.description}</p>

          {project.links?.length ? (
            <>
              <h3>Links</h3>
              <ul>
                {project.links.map((l) => (
                  <li key={l.url}>
                    <a className="text-accent" href={l.url} target="_blank" rel="noreferrer">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {project.downloads?.length ? (
            <>
              <h3>Downloads</h3>
              <ul>
                {project.downloads.map((d) => (
                  <li key={d.url}>
                    <a className="text-accent" href={d.url} target="_blank" rel="noreferrer">
                      {d.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {project.contact?.length ? (
            <>
              <h3>Contact</h3>
              <ul>
                {project.contact.map((c) => (
                  <li key={c.href}>
                    <a className="text-accent" href={c.href}>
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <h3>Tags</h3>
          <p>
            {project.tags.map((t) => (
              <span key={t} className="mr-2 inline-block rounded bg-white/[0.10] px-2 py-0.5 text-xs dark:bg-white/[0.06]">
                {t}
              </span>
            ))}
          </p>
        </div>
      </Card>
    </section>
  )
}
