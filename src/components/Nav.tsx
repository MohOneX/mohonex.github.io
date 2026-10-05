import { useEffect, useState } from 'react'
import { site } from '../data/projects'
import { Icon } from './Icon'
import './Nav.css'

export function Nav() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(entry.target.id === 'top' ? '' : entry.target.id)
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 },
    )
    document
      .querySelectorAll('main > section')
      .forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return (
    <header className="nav">
      <div className="nav__inner container">
        <a className="nav__brand" href="#top" aria-label={`${site.name}, home`}>
          moh<span>.</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {[
            ['work', 'Work'],
            ['approach', 'Approach'],
            ['contact', 'Contact'],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="nav__github"
          href={site.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub <Icon name="external" />
        </a>
      </div>
    </header>
  )
}
