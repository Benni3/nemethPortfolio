import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import SocialTags from '../components/SocialTags'
import cvPdf from '../lib/Benjamin_Nemeth_CV.pdf'
import homeContent from '../lib/home.json'

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

type ParagraphSection = {
  type: 'paragraph'
  title: string
  text: string
  ctaLabel?: string
  ctaUrl?: string
}

type ListSection = {
  type: 'list'
  title: string
  items: string[]
  ctaLabel?: string
  ctaUrl?: string
}

type TimelineLink = {
  label: string
  url: string
}

type TimelineItem = {
  label: string
  title: string
  description: string
  links?: TimelineLink[]
}

type TimelineSection = {
  type: 'timeline'
  title: string
  items: TimelineItem[]
  ctaLabel?: string
  ctaUrl?: string
}

type SkillItem = {
  label: string
  value: number
}

type SkillsSection = {
  type: 'skills'
  title: string
  items: SkillItem[]
  ctaLabel?: string
  ctaUrl?: string
}

type HomeSection =
  | ParagraphSection
  | ListSection
  | TimelineSection
  | SkillsSection

type HomeContent = {
  hero: {
    tag: string
    name: string
    description: string
  }
  sections: HomeSection[]
}

const content = homeContent as HomeContent

type ModalState = {
  open: boolean
  section: HomeSection | null
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>
}

function clampText(text: string, max = 180) {
  if (text.length <= max) return text
  return `${text.slice(0, max).trim()}…`
}

function needsShowMore(section: HomeSection) {
  switch (section.type) {
    case 'paragraph':
      return section.text.length > 180
    case 'list':
      return section.items.length > 4
    case 'timeline':
      return section.items.length > 2
    case 'skills':
      return section.items.length > 4
    default:
      return false
  }
}

function isExternalUrl(url: string) {
  return url.startsWith('http')
}

function ActionLink({
  label,
  url,
  className = '',
}: {
  label: string
  url: string
  className?: string
}) {
  if (isExternalUrl(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {label}
      </a>
    )
  }

  return (
    <Link to={url} className={className}>
      {label}
    </Link>
  )
}

function ParagraphPreview({ section }: { section: ParagraphSection }) {
  return (
    <p className="mt-3 text-zinc-700 dark:text-zinc-300">
      {clampText(section.text)}
    </p>
  )
}

function ParagraphFull({ section }: { section: ParagraphSection }) {
  return (
    <p className="mt-3 leading-7 text-zinc-700 dark:text-zinc-300">
      {section.text}
    </p>
  )
}

function ListPreview({ section }: { section: ListSection }) {
  return (
    <ul className="mt-4 space-y-3">
      {section.items.slice(0, 4).map((item) => (
        <li key={item} className="flex gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ListFull({ section }: { section: ListSection }) {
  return (
    <ul className="mt-4 space-y-3">
      {section.items.map((item) => (
        <li key={item} className="flex gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function TimelinePreview({ section }: { section: TimelineSection }) {
  return (
    <div className="mt-5 space-y-5">
      {section.items.slice(0, 2).map((item, index) => (
        <div key={`${item.label}-${item.title}-${index}`} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-accent" />
            {index < Math.min(section.items.length, 2) - 1 && (
              <div className="mt-2 w-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
            )}
          </div>

          <div className="pb-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {item.label}
            </p>
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="mt-1 text-zinc-700 dark:text-zinc-300">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TimelineFull({ section }: { section: TimelineSection }) {
  return (
    <div className="mt-5 space-y-6">
      {section.items.map((item, index) => (
        <div key={`${item.label}-${item.title}-${index}`} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-accent" />
            {index < section.items.length - 1 && (
              <div className="mt-2 w-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
            )}
          </div>

          <div className="pb-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {item.label}
            </p>
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="mt-1 text-zinc-700 dark:text-zinc-300">
              {item.description}
            </p>

            {item.links?.length ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {item.links.map((link) => (
                  <ActionLink
                    key={`${item.title}-${link.label}-${link.url}`}
                    label={link.label}
                    url={link.url}
                    className="text-sm text-accent hover:underline"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

function SkillsPreview({ section }: { section: SkillsSection }) {
  return (
    <div className="mt-5 space-y-4">
      {section.items.slice(0, 4).map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-zinc-700 dark:text-zinc-300">{item.label}</span>
            <span className="text-zinc-500">{item.value}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/20 dark:bg-white/10">
            <div
              className="h-2 rounded-full bg-accent transition-all duration-500"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function SkillsFull({ section }: { section: SkillsSection }) {
  return (
    <div className="mt-5 space-y-4">
      {section.items.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-zinc-700 dark:text-zinc-300">{item.label}</span>
            <span className="text-zinc-500">{item.value}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/20 dark:bg-white/10">
            <div
              className="h-2 rounded-full bg-accent transition-all duration-500"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function HomeSectionPreview({
  section,
  onOpen,
}: {
  section: HomeSection
  onOpen: () => void
}) {
  const showMore = needsShowMore(section)

  return (
    <Card className="group relative h-full p-6">
      <SectionTitle>{section.title}</SectionTitle>

      {section.type === 'paragraph' && <ParagraphPreview section={section} />}
      {section.type === 'list' && <ListPreview section={section} />}
      {section.type === 'timeline' && <TimelinePreview section={section} />}
      {section.type === 'skills' && <SkillsPreview section={section} />}

      <div className="mt-5 flex flex-wrap gap-4">
        {'ctaLabel' in section && section.ctaLabel && section.ctaUrl ? (
          <ActionLink
            label={section.ctaLabel}
            url={section.ctaUrl}
            className="text-sm text-accent hover:underline"
          />
        ) : null}

        {showMore ? (
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-zinc-700 transition hover:bg-white/10 dark:text-zinc-200"
          >
            Show more
          </button>
        ) : null}
      </div>

      {showMore ? (
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      ) : null}
    </Card>
  )
}

function HomeSectionModal({
  section,
  onClose,
}: {
  section: HomeSection
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
      />

      <Card className="relative z-[101] max-h-[85vh] w-full max-w-3xl overflow-y-auto p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <SectionTitle>{section.title}</SectionTitle>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 px-3 py-1 text-sm text-zinc-700 transition hover:bg-white/10 dark:text-zinc-200"
          >
            Close
          </button>
        </div>

        {section.type === 'paragraph' && <ParagraphFull section={section} />}
        {section.type === 'list' && <ListFull section={section} />}
        {section.type === 'timeline' && <TimelineFull section={section} />}
        {section.type === 'skills' && <SkillsFull section={section} />}

        {'ctaLabel' in section && section.ctaLabel && section.ctaUrl ? (
          <div className="mt-6">
            <ActionLink
              label={section.ctaLabel}
              url={section.ctaUrl}
              className="text-sm text-accent hover:underline"
            />
          </div>
        ) : null}
      </Card>
    </div>
  )
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

        const API_BASE = import.meta.env.VITE_API_BASE_URL
        const res = await fetch(`${API_BASE}/api/projects`)
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

          <div className="hidden gap-2 md:flex">
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
          <div className="flex gap-4 overflow-x-auto pb-2 md:hidden">
            {featured.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="min-w-[220px] shrink-0"
              >
                <Card className="h-full p-4">
                  <div className="h-32 overflow-hidden rounded-2xl bg-white/20 sm:h-36 md:h-auto md:aspect-[16/9] dark:bg-white/10">
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
                    <div className="h-32 overflow-hidden rounded-2xl bg-white/20 sm:h-36 md:h-auto md:aspect-[16/9] dark:bg-white/10">
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
  const [modal, setModal] = useState<ModalState>({ open: false, section: null })

  const openSection = (section: HomeSection) => {
    setModal({ open: true, section })
  }

  const closeSection = () => {
    setModal({ open: false, section: null })
  }

  const hasModal = useMemo(() => modal.open && modal.section, [modal])

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="p-8 xl:col-span-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            {content.hero.tag}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {content.hero.name}
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-700 dark:text-zinc-300">
            {content.hero.description}
          </p>

          <div className="mt-6">
            <SocialTags />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Who am I?</h2>

          <p className="mt-3 text-zinc-700 dark:text-zinc-300">
            Explore the short version of who I am, what I build, and what I’m
            aiming toward.
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

        {content.sections.map((section, index) => (
          <HomeSectionPreview
            key={`${section.type}-${section.title}-${index}`}
            section={section}
            onOpen={() => openSection(section)}
          />
        ))}
      </div>

      <div className="mt-6">
        <ProjectCarousel />
      </div>

      {hasModal ? (
        <HomeSectionModal section={modal.section as HomeSection} onClose={closeSection} />
      ) : null}
    </section>
  )
}