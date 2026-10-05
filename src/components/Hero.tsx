import { projects, site } from '../data/projects'
import { Icon } from './Icon'
import { ProjectImage } from './ProjectImage'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__layout">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">
            <span className="status-dot" /> Independent developer. Practical
            thinker.
          </p>
          <h1 id="hero-title">
            Useful software.
            <br />
            <span>Thoughtfully</span>
            <br />
            built<span className="hero__period">.</span>
          </h1>
          <p className="hero__intro">
            Hi, I’m {site.name}. {site.tagline}
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#work">
              Explore my work <Icon />
            </a>
            <a className="text-link" href="#contact">
              Let’s talk <Icon name="external" />
            </a>
          </div>
          <div className="hero__signature">
            <span className="hero__monogram" aria-hidden="true">
              m.
            </span>
            <span>
              From the first idea
              <br />
              <strong>to something you can use.</strong>
            </span>
          </div>
        </div>
        <a
          className="hero__showcase"
          href="#dentaxis"
          aria-label="Explore DentAxis, featured Windows app"
        >
          <div className="hero__showcase-top">
            <span>
              <span className="status-dot" /> Built for the everyday
            </span>
            <Icon name="external" />
          </div>
          <div className="hero__product-label">
            <span className="hero__product-mark" aria-hidden="true">
              D
            </span>
            <div>
              <strong>DentAxis</strong>
              <span>A clearer view of your practice.</span>
            </div>
          </div>
          <div className="hero__screen">
            <ProjectImage
              project={projects[0]}
              priority
              sizes="(max-width: 900px) 90vw, 55vw"
            />
          </div>
          <div className="hero__showcase-bottom">
            <span>01 / Featured project</span>
            <span>
              Windows desktop app <Icon />
            </span>
          </div>
        </a>
      </div>
      <div className="container hero__foot">
        <span>Small details. Real-world purpose.</span>
        <a href="#work">
          Scroll to explore <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}
