import { projects, type Project } from '../data/projects'
import { Icon } from './Icon'
import { ProjectImage } from './ProjectImage'
import './Work.css'

export function Work({
  onViewPdf,
  onViewImage,
}: {
  onViewPdf: (project: Project) => void
  onViewImage: (project: Project, imageIndex?: number) => void
}) {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span>01 /</span> Selected work
            </p>
            <h2 id="work-title">
              Ideas, made useful<span className="accent">.</span>
            </h2>
          </div>
          <p>
            Different problems. The same intention:
            <br />
            make the everyday a little easier.
          </p>
        </div>
        <div className="work__grid">
          {projects.map((project, index) => (
            <article
              className={`project project--${project.id}`}
              id={project.id}
              key={project.id}
            >
              <div className="project__visual">
                <div className="project__visual-meta">
                  <span>
                    {String(index + 1).padStart(2, '0')} / {project.category}
                  </span>
                  <span>
                    {index === 0
                      ? 'Featured project'
                      : project.id === 'pdf-control'
                        ? 'Desktop software'
                        : 'Made for your everyday'}
                  </span>
                </div>
                {project.screenshots ? (
                  <div className="project__gallery">
                    {project.screenshots.map((screenshot, imageIndex) => (
                      <button
                        key={screenshot.image}
                        className="project__image-button"
                        onClick={() => onViewImage(project, imageIndex)}
                        aria-label={`Enlarge ${project.name} screenshot ${imageIndex + 1}`}
                      >
                        <ProjectImage
                          project={screenshot}
                          sizes="(max-width: 720px) 25vw, 170px"
                        />
                        <span className="project__enlarge">
                          <Icon name="plus" /> {imageIndex + 1} /{' '}
                          {project.screenshots!.length}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    className="project__image-button"
                    onClick={() => onViewImage(project)}
                    aria-label={`Enlarge ${project.name} screenshot`}
                  >
                    <ProjectImage
                      project={project}
                      sizes={
                        index === 0
                          ? '(max-width: 720px) 90vw, 1000px'
                          : '(max-width: 720px) 90vw, 560px'
                      }
                    />
                    <span className="project__enlarge">
                      <Icon name="plus" /> View screenshot
                    </span>
                  </button>
                )}
              </div>
              <div className="project__content">
                <div className="project__intro">
                  <div className="project__title-row">
                    <h3>{project.name}</h3>
                    <span className="project__number">0{index + 1}</span>
                  </div>
                  <p className="project__headline">{project.headline}</p>
                  <p className="project__description">{project.outcome}</p>
                  <ul className="project__tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="project__links">
                  {project.pdfViewUrl ? (
                    <button
                      className="text-link"
                      onClick={() => onViewPdf(project)}
                    >
                      Preview planner <Icon name="external" />
                    </button>
                  ) : project.href ? (
                    <a
                      className="text-link"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Explore project <Icon name="external" />
                    </a>
                  ) : (
                    <button
                      className="text-link"
                      onClick={() => onViewImage(project)}
                    >
                      {project.screenshots
                        ? 'View screenshots'
                        : 'View screenshot'}{' '}
                      <Icon name="plus" />
                    </button>
                  )}
                  {project.download && (
                    <a className="btn btn--download" href={project.download}>
                      <Icon name="download" />
                      {project.downloadLabel}
                    </a>
                  )}
                  {!project.download && project.downloadLabel && (
                    <button
                      className="btn btn--download btn--coming-soon"
                      disabled
                      title="Download link coming soon"
                    >
                      <Icon name="download" />
                      {project.downloadLabel}
                    </button>
                  )}
                  {project.downloadMeta && (
                    <span className="project__download-meta">
                      {project.downloadMeta}
                    </span>
                  )}
                </div>
              </div>
              <details className="project__story">
                <summary>
                  Behind the project <Icon name="plus" />
                </summary>
                <div className="project__story-content">
                  <div>
                    <h4>The problem</h4>
                    <p>{project.challenge}</p>
                  </div>
                  <div>
                    <h4>What I built</h4>
                    <p>{project.contribution}</p>
                  </div>
                  <div>
                    <h4>The result</h4>
                    <p>{project.result}</p>
                  </div>
                  <ul>
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </details>
            </article>
          ))}
        </div>
        <p className="work__note">
          <span className="status-dot" /> Apps, games, and digital products.
          Built with care.
        </p>
      </div>
    </section>
  )
}
