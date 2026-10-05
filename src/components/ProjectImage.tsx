import { assetUrl, type ProjectScreenshot } from '../data/projects'

export function ProjectImage({
  project,
  priority = false,
  sizes = '(max-width: 720px) 92vw, 50vw',
}: {
  project: ProjectScreenshot
  priority?: boolean
  sizes?: string
}) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={
          project.width <= 800
            ? `${assetUrl(`${project.image}-800.webp`)} ${project.width}w`
            : `${assetUrl(`${project.image}-800.webp`)} 800w, ${assetUrl(`${project.image}-1600.webp`)} ${Math.min(1600, project.width)}w`
        }
        sizes={sizes}
      />
      <img
        src={assetUrl(project.original ?? `${project.image}.png`)}
        alt={project.imageAlt}
        width={project.width}
        height={project.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}
