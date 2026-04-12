import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Project } from '../lib/projects'
import Card from '../components/Card'
import ImageCarousel from '../components/ImageCarousel'

/* 🔥 Strong version where everything is guaranteed */
type SafeProject = Project & {
  tags: string[]
  images: NonNullable<Project['images']>
  links: NonNullable<Project['links']>
  downloads: NonNullable<Project['downloads']>
  contact: NonNullable<Project['contact']>
}

type LoadState =
  | { kind: 'loading' }
  | { kind: 'notfound' }
  | { kind: 'loaded'; project: SafeProject }

/* 🔥 Normalize AND return safe type */
function normalizeProject(project: Project): SafeProject {
  return {
    ...project,
    tags: project.tags ?? [],
    images: project.images ?? [],
    links: project.links ?? [],
    downloads: project.downloads ?? [],
    contact: project.contact ?? [],
  }
}

export default function Project() {
  const { slug } = useParams()
  const [state, setState] = useState<LoadState>({ kind: 'loading' })

  useEffect(() => {
    let cancelled = false

    async function loadProject() {
      if (!slug) {
        setState({ kind: 'notfound' })
        return
      }

      try {
        setState({ kind: 'loading' })

        const API_BASE = import.meta.env.VITE_API_BASE_URL
        const res = await fetch(`${API_BASE}/api/projects`)

        if (!res.ok) {
          setState({ kind: 'notfound' })
          return
        }

        const data = (await res.json()) as Project[]
        const found = data.find((p) => p.slug === slug)

        if (cancelled) return

        if (!found) {
          setState({ kind: 'notfound' })
          return
        }

        setState({
          kind: 'loaded',
          project: normalizeProject(found),
        })
      } catch {
        if (!cancelled) {
          setState({ kind: 'notfound' })
        }
      }
    }

    loadProject()

    return () => {
      cancelled = true
    }
  }, [slug])

  if (state.kind === 'loading') {
    return (
      <section className="mx-auto max-w-5xl px-4 py-14">
        <p>Loading…</p>
      </section>
    )
  }

  if (state.kind === 'notfound') {
    return (
      <section className="mx-auto max-w-5xl px-4 py-14">
        <p>Project not found.</p>
      </section>
    )
  }

  const project = state.project

  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {project.summary}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {project.status && (
            <span className="rounded-full bg-white/[0.10] px-3 py-1 text-xs">
              {project.status}
            </span>
          )}
          {project.date && (
            <span className="rounded-full bg-white/[0.10] px-3 py-1 text-xs">
              {project.date}
            </span>
          )}
        </div>
      </div>

      {project.images.length > 0 && (
        <div className="mt-8">
          <ImageCarousel images={project.images} />
        </div>
      )}

      <Card className="mt-8">
        <div className="prose dark:prose-invert">
          <h2>Description</h2>
          <p>{project.description}</p>

          {project.links.length > 0 && (
            <>
              <h3>Links</h3>
              <ul>
                {project.links.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noreferrer" className="text-accent">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {project.downloads.length > 0 && (
            <>
              <h3>Downloads</h3>
              <ul>
                {project.downloads.map((d) => (
                  <li key={d.url}>
                    <a href={d.url} target="_blank" rel="noreferrer" className="text-accent">
                      {d.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {project.contact.length > 0 && (
            <>
              <h3>Contact</h3>
              <ul>
                {project.contact.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} className="text-accent">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {project.tags.length > 0 && (
            <>
              <h3>Tags</h3>
              <p>
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="mr-2 inline-block rounded bg-white/[0.10] px-2 py-0.5 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </p>
            </>
          )}
        </div>
      </Card>
    </section>
  )
}