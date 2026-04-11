import { Link } from 'react-router-dom'
import type { Project } from '../lib/projects'
import Card from './Card'
import ImageCarousel from './ImageCarousel'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="block">
      <Card className="p-0 overflow-hidden">
        {project.images?.length ? (
          <ImageCarousel images={project.images} className="rounded-none" aspect="aspect-[16/10]" />
        ) : null}

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-semibold leading-snug">{project.title}</h2>
            {project.status ? (
              <span className="shrink-0 rounded-full bg-white/[0.10] px-2 py-0.5 text-[11px] text-zinc-700 backdrop-blur dark:bg-white/[0.06] dark:text-zinc-300">
                {project.status}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{project.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 6).map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded bg-white/[0.10] dark:bg-white/[0.06] backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}
