import { useId, useState } from 'react'
import type { ProjectImage } from '../lib/projects'

export default function ImageCarousel({
  images,
  className = '',
  aspect = 'aspect-video',
}: {
  images: ProjectImage[]
  className?: string
  aspect?: string
}) {
  const [idx, setIdx] = useState(0)
  const id = useId()

  if (!images.length) return null

  const current = images[Math.min(idx, images.length - 1)]
  const canPrev = images.length > 1

  return (
    <div className={['relative overflow-hidden rounded-2xl', className].join(' ')}>
      <div className={['relative w-full', aspect].join(' ')}>
        <img
          src={current.src}
          alt={current.alt ?? ''}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
      </div>

      {canPrev && (
        <>
          <button
            type="button"
            aria-controls={id}
            aria-label="Previous image"
            onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-2 py-1 text-white backdrop-blur hover:bg-black/45"
          >
            ‹
          </button>
          <button
            type="button"
            aria-controls={id}
            aria-label="Next image"
            onClick={() => setIdx((i) => (i + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-2 py-1 text-white backdrop-blur hover:bg-black/45"
          >
            ›
          </button>

          <div
            id={id}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-2 py-1 text-[11px] text-white backdrop-blur"
          >
            {idx + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  )
}
