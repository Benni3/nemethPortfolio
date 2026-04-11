import { Router } from 'express'
import path from 'node:path'
import fs from 'node:fs/promises'
import { ProjectsSchema } from '../lib/projectsSchema'

const r = Router()

async function loadProjects() {
  const file = path.resolve(__dirname, '../data/projects.json')
  const raw = await fs.readFile(file, 'utf-8').catch(() => '[]')
  const parsedJson = JSON.parse(raw)
  const parsed = ProjectsSchema.safeParse(parsedJson)
  if (!parsed.success) {
    const err = parsed.error.flatten()
    throw Object.assign(new Error('Invalid projects.json schema'), { details: err })
  }
  return parsed.data
}

r.get('/projects', async (_req, res) => {
  try {
    const items = await loadProjects()
    res.json(items)
  } catch (err: any) {
    console.error('projects load failed', err?.details ?? err)
    res.status(500).json({ error: 'Failed to load projects' })
  }
})

r.get('/projects/:slug', async (req, res) => {
  try {
    const items = await loadProjects()
    const item = items.find((p) => p.slug === req.params.slug)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err: any) {
    console.error('projects load failed', err?.details ?? err)
    res.status(500).json({ error: 'Failed to load projects' })
  }
})

export default r
