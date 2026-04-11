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

type TimelineItem = {
  label: string
  title: string
  description: string
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>
}

function ParagraphBlock({ section }: { section: ParagraphSection }) {
  return (
    <Card className="p-6">
      <SectionTitle>{section.title}</SectionTitle>
      <p className="mt-3 leading-7 text-zinc-700 dark:text-zinc-300">
        {section.content}
      </p>
    </Card>
  )
}

function ListBlock({ section }: { section: ListSection }) {
  return (
    <Card className="p-6">
      <SectionTitle>{section.title}</SectionTitle>
      <ul className="mt-4 space-y-3">
        {section.items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-zinc-700 dark:text-zinc-300"
          >
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function TimelineBlock({ section }: { section: TimelineSection }) {
  return (
    <Card className="p-6">
      <SectionTitle>{section.title}</SectionTitle>
      <div className="mt-5 space-y-5">
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
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function SkillsBlock({ section }: { section: SkillsSection }) {
  return (
    <Card className="p-6">
      <SectionTitle>{section.title}</SectionTitle>
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
    </Card>
  )
}

function RenderSection({ section }: { section: AboutSection }) {
  switch (section.type) {
    case 'paragraph':
      return <ParagraphBlock section={section} />
    case 'list':
      return <ListBlock section={section} />
    case 'timeline':
      return <TimelineBlock section={section} />
    case 'skills':
      return <SkillsBlock section={section} />
    default:
      return null
  }
}

export default function About() {
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
          <RenderSection key={`${section.type}-${index}`} section={section} />
        ))}
      </div>
    </section>
  )
}