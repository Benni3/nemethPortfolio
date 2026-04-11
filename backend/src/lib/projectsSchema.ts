import { z } from 'zod'

export const ProjectLinkSchema = z.object({
  label: z.string().min(1).max(200),
  url: z.string().min(1).max(2000),
})

export const ProjectImageSchema = z.object({
  src: z.string().min(1).max(2000),
  alt: z.string().max(500).optional(),
})

export const ProjectDownloadSchema = z.object({
  label: z.string().min(1).max(200),
  url: z.string().min(1).max(2000),
})

export const ProjectContactSchema = z.object({
  label: z.string().min(1).max(200),
  href: z.string().min(1).max(2000),
})

export const ProjectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  summary: z.string().min(1).max(500),
  description: z.string().min(1).max(10000),
  tags: z.array(z.string().min(1).max(50)).max(50),
  links: z.array(ProjectLinkSchema).optional(),
  images: z.array(ProjectImageSchema).optional(),
  downloads: z.array(ProjectDownloadSchema).optional(),
  contact: z.array(ProjectContactSchema).optional(),
  status: z.enum(['active', 'archived', 'wip']).optional(),
  date: z.string().min(4).max(50).optional(),
})

export const ProjectsSchema = z.array(ProjectSchema)

export type Project = z.infer<typeof ProjectSchema>
