import { site } from '../data/projects'
import { Icon } from './Icon'
import './Contact.css'

const copyrightYear = new Date().getFullYear()

export function Contact() {
  return (
    <section
      className="section contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <p className="eyebrow">
          <span>03 /</span> Let’s connect
        </p>
        <div className="contact__main">
          <div>
            <h2 id="contact-title">
              Have something
              <br />
              <span>in mind?</span>
            </h2>
            <p>
              A product idea, a collaboration, or a conversation about
              <br className="desktop-break" /> something I’ve built. I’d love to
              hear from you.
            </p>
            <a
              className="btn btn--primary"
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Let’s talk on WhatsApp <Icon name="external" />
            </a>
          </div>
          <div className="contact__links">
            <p>Find me elsewhere</p>
            {[
              ['GitHub', site.github, 'Code & projects'],
              ['LinkedIn', site.linkedin, 'Connect professionally'],
              ...(site.email
                ? [['Email', `mailto:${site.email}`, 'Say hello']]
                : []),
            ].map(([label, href, description]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                <span>
                  <strong>{label}</strong>
                  <small>{description}</small>
                </span>
                <Icon name="external" />
              </a>
            ))}
          </div>
        </div>
        <footer className="contact__footer">
          <a className="nav__brand" href="#top" aria-label="Back to top">
            moh<span>.</span>
          </a>
          <p>
            © {copyrightYear} {site.name}. Built with intention.
          </p>
          <a className="contact__back" href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </footer>
      </div>
    </section>
  )
}
