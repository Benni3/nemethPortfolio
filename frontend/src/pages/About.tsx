import { useMemo, useState } from 'react'
import Card from '../components/Card'
import aboutData from '../lib/about.json'
import cvPdf from '../lib/Benjamin_Nemeth_CV.pdf'

type ParagraphSection = {
  type: 'paragraph'
  title: string
  content: string
}

type ListSection = {
  type: 'list'
  title: string
  items: string[]
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
}

type SkillItem = {
  label: string
  value: number
}

type SkillsSection = {
  type: 'skills'
  title: string
  items: SkillItem[]
}

type AboutSection =
  | ParagraphSection
  | ListSection
  | TimelineSection
  | SkillsSection

type AboutData = {
  title: string
  intro?: string
  sections: AboutSection[]
}

const data = aboutData as AboutData

type ModalState = {
  open: boolean
  section: AboutSection | null
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>
}

function needsShowMore(section: AboutSection) {
  switch (section.type) {
    case 'paragraph':
      return section.content.length > 180
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

function clampParagraph(text: string) {
  if (text.length <= 180) return text
  return `${text.slice(0, 180).trim()}…`
}

function ParagraphPreview({ section }: { section: ParagraphSection }) {
  return (
    <p className="mt-3 leading-7 text-zinc-700 dark:text-zinc-300">
      {clampParagraph(section.content)}
    </p>
  )
}

function ParagraphFull({ section }: { section: ParagraphSection }) {
  return (
    <p className="mt-3 leading-7 text-zinc-700 dark:text-zinc-300">
      {section.content}
    </p>
  )
}

function ListPreview({ section }: { section: ListSection }) {
  const items = section.items.slice(0, 4)
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
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
  const items = section.items.slice(0, 2)
  return (
    <div className="mt-5 space-y-5">
      {items.map((item, index) => (
        <div key={`${item.label}-${item.title}-${index}`} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-accent" />
            {index < items.length - 1 && (
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
                  <a
                    key={`${item.title}-${link.url}`}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-sm text-accent hover:underline"
                  >
                    {link.label}
                  </a>
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
  const items = section.items.slice(0, 4)
  return (
    <div className="mt-5 space-y-4">
      {items.map((item) => (
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

function SectionPreview({
  section,
  onOpen,
}: {
  section: AboutSection
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

      {showMore ? (
        <div className="mt-5">
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-zinc-700 transition hover:bg-white/10 dark:text-zinc-200"
          >
            Show more
          </button>
        </div>
      ) : null}

      {showMore ? (
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      ) : null}
    </Card>
  )
}

function SectionModal({
  section,
  onClose,
}: {
  section: AboutSection
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
      </Card>
    </div>
  )
}

export default function About() {
  const [modal, setModal] = useState<ModalState>({ open: false, section: null })

  const openSection = (section: AboutSection) => {
    setModal({ open: true, section })
  }

  const closeSection = () => {
    setModal({ open: false, section: null })
  }

  const hasModal = useMemo(() => modal.open && modal.section, [modal])

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>
          {data.intro && (
            <p className="mt-3 max-w-3xl text-zinc-700 dark:text-zinc-300">
              {data.intro}
            </p>
          )}
        </div>

        <a
          href={cvPdf}
          download="Benjamin_Nemeth_CV.pdf"
          className="inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Download CV
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.sections.map((section, index) => (
          <SectionPreview
            key={`${section.type}-${index}`}
            section={section}
            onOpen={() => openSection(section)}
          />
        ))}
      </div>

      {hasModal ? (
        <SectionModal section={modal.section as AboutSection} onClose={closeSection} />
      ) : null}
    </section>
  )
}