import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import SocialTags from '../components/SocialTags'
import cvPdf from '../lib/Benjamin_Nemeth_CV.pdf'

type ProjectImage = {
  src: string
  alt: string
}

type Project = {
  slug: string
  title: string
  summary: string
  images?: ProjectImage[]
  tags?: string[]
}

function ProjectCarousel() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadProjects() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch('/api/projects')
        if (!res.ok) throw new Error('Failed to load projects')

        const data = (await res.json()) as Project[]
        if (!cancelled) setProjects(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load projects')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProjects()

    return () => {
      cancelled = true
    }
  }, [])

  const featured = projects.slice(0, 5)
  const maxIndex = Math.max(0, featured.length - 1)

  function prev() {
    setIndex((i) => Math.max(0, i - 1))
  }

  function next() {
    setIndex((i) => Math.min(maxIndex, i + 1))
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Featured Projects</h2>

        <div className="flex items-center gap-3">
          <Link to="/projects" className="text-sm text-accent hover:underline">
            View all
          </Link>

          <div className="hidden md:flex gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm disabled:opacity-40 dark:bg-white/10"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index === maxIndex}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm disabled:opacity-40 dark:bg-white/10"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">Loading projects...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <>
          {/* Mobile: scroll */}
          <div className="flex gap-4 overflow-x-auto pb-2 md:hidden">
            {featured.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="min-w-[220px] shrink-0"
              >
                <Card className="h-full p-4">
                  <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-white/20 dark:bg-white/10">
                    {project.images?.[0]?.src ? (
                      <img
                        src={project.images[0].src}
                        alt={project.images[0].alt || project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
                        Project image
                      </div>
                    )}
                  </div>

                  <h3 className="mt-3 text-base font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {project.summary}
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          {/* Desktop: arrows */}
          <div className="hidden overflow-hidden md:block">
            <div
              className="flex gap-4 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${index * 244}px)` }}
            >
              {featured.map((project) => (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className="w-[228px] shrink-0"
                >
                  <Card className="h-full p-4">
                    <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-white/20 dark:bg-white/10">
                      {project.images?.[0]?.src ? (
                        <img
                          src={project.images[0].src}
                          alt={project.images[0].alt || project.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
                          Project image
                        </div>
                      )}
                    </div>

                    <h3 className="mt-3 text-base font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                      {project.summary}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  )
}

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="p-8 xl:col-span-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Portfolio</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Benjamin Jarlsson Nemeth
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-700 dark:text-zinc-300">
            I build systems that connect engineering, software, and intelligent behavior.
            My focus is on creating thoughtful, scalable solutions that combine theory with
            practical implementation.
          </p>

          <div className="mt-6">
            <SocialTags />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Who am I?</h2>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300">
            I’m an Electrical Engineering student at DTU with strong interests in software,
            AI, robotics, and systems design. I enjoy building projects where multiple fields
            come together into one coherent system.
          </p>

          <div className="mt-5 flex flex-wrap gap-4">
            <Link to="/about" className="text-sm text-accent hover:underline">
              Read more about me
            </Link>

            <a
              href={cvPdf}
              download="Benjamin_Nemeth_CV.pdf"
              className="text-sm text-accent hover:underline"
            >
              Download CV
            </a>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300">
            Learn more about my background, interests, technical focus areas, and long-term
            vision.
          </p>
          <Link to="/about" className="mt-5 inline-block text-sm text-accent hover:underline">
            Go to About
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300">
            Explore the projects I’ve built, the systems I’m working on, and the ideas I’m
            testing across hardware, software, and design.
          </p>
          <Link to="/projects" className="mt-5 inline-block text-sm text-accent hover:underline">
            Browse projects
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Why contact?</h2>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300">
            Reach out if you want to collaborate, discuss ideas, explore technical work, or
            connect around engineering, AI, systems, or product-building.
          </p>
          <Link to="/contact" className="mt-5 inline-block text-sm text-accent hover:underline">
            Go to Contact
          </Link>
        </Card>
      </div>

      <div className="mt-6">
        <ProjectCarousel />
      </div>
    </section>
  )
}