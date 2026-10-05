import { site } from '../data/projects'
import './Approach.css'

const principles = [
  {
    title: 'Start with the real problem.',
    copy: 'Understand the task, the person doing it, and the friction in between. Useful software starts there.',
  },
  {
    title: 'Make the complex feel simple.',
    copy: 'Clear interfaces, considered defaults, and a place for everything. Every detail should help someone move forward.',
  },
  {
    title: 'Build. Learn. Refine.',
    copy: 'Ship something useful, pay attention to how it works, and keep making it better. Good products are a practice.',
  },
]

export function Approach() {
  return (
    <section
      className="section approach"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="container">
        <div className="approach__intro">
          <p className="eyebrow">
            <span>02 /</span> The approach
          </p>
          <div>
            <h2 id="approach-title">
              Thought behind the interface.
              <br />
              <span>Purpose behind every detail.</span>
            </h2>
            <p>
              I’m Moh, a software developer and digital product builder. I care
              about the whole experience: what a product does, how it feels, and
              how well it holds up in everyday use.
            </p>
          </div>
        </div>
        <div className="approach__principles">
          {principles.map((principle, index) => (
            <article key={principle.title}>
              <span className="approach__number">0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
        <div className="approach__footer">
          <span className="approach__asterisk" aria-hidden="true">
            ✳
          </span>
          <p>{site.philosophy}</p>
          <span>Always a work in progress.</span>
        </div>
      </div>
    </section>
  )
}
