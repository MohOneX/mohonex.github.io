import { useState } from 'react'
import { Approach } from './components/Approach'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { PdfViewerModal } from './components/PdfViewerModal'
import { Work } from './components/Work'
import type { Project } from './data/projects'
import './App.css'

function App() {
  const [preview, setPreview] = useState<{
    project: Project
    mode: 'pdf' | 'image'
    imageIndex?: number
  } | null>(null)
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Work
          onViewPdf={(project) => setPreview({ project, mode: 'pdf' })}
          onViewImage={(project, imageIndex = 0) =>
            setPreview({ project, mode: 'image', imageIndex })
          }
        />
        <Approach />
        <Contact />
      </main>
      {preview && (
        <PdfViewerModal
          project={preview.project}
          mode={preview.mode}
          initialImageIndex={preview.imageIndex}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  )
}

export default App
