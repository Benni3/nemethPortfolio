export type ProjectLink = { label: string; url: string }
export type ProjectImage = { src: string; alt?: string }
export type ProjectDownload = { label: string; url: string }
export type ProjectContact = { label: string; href: string }

export type ProjectStatus = 'active' | 'archived' | 'wip'

export type Project = {
  title: string
  slug: string
  summary: string
  description: string
  tags: string[]
  links?: ProjectLink[]
  images?: ProjectImage[]
  downloads?: ProjectDownload[]
  contact?: ProjectContact[]
  status?: ProjectStatus
  date?: string
}
