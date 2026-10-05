import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { assetUrl, type Project } from '../data/projects'
import { Icon } from './Icon'
import './PdfViewerModal.css'

const PdfDocument = lazy(() => import('./PdfDocument'))

class PdfLoadBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? (
      <p className="pdf-viewer__fallback" role="alert">
        The preview couldn’t start. Use Open PDF or download the planner above.
      </p>
    ) : (
      this.props.children
    )
  }
}

export function PdfViewerModal({
  project,
  mode,
  onClose,
  initialImageIndex = 0,
}: {
  project: Project
  mode: 'pdf' | 'image'
  onClose: () => void
  initialImageIndex?: number
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const images = project.screenshots ?? [project]
  const [imageIndex, setImageIndex] = useState(initialImageIndex)
  const currentImage = images[imageIndex] ?? images[0]
  const keepFocusInside = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (
      mode === 'image' &&
      images.length > 1 &&
      (event.key === 'ArrowRight' || event.key === 'ArrowLeft')
    ) {
      event.preventDefault()
      setImageIndex(
        (index) =>
          (index + (event.key === 'ArrowRight' ? 1 : -1) + images.length) %
          images.length,
      )
      return
    }
    if (event.key !== 'Tab') return
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button, input, [tabindex="0"]',
      ),
    ).filter(
      (element) =>
        element.getClientRects().length > 0 && !element.matches(':disabled'),
    )
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])
  return (
    <dialog
      ref={dialogRef}
      className={`pdf-viewer pdf-viewer--${mode}`}
      aria-labelledby="preview-title"
      aria-describedby={mode === 'pdf' ? 'preview-note' : undefined}
      onCancel={onClose}
      onKeyDown={keepFocusInside}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="pdf-viewer__panel">
        <header className="pdf-viewer__header">
          <div>
            <p className="eyebrow">
              {mode === 'pdf' ? 'PDF preview' : 'A closer look'}
            </p>
            <h2 id="preview-title">{project.name}</h2>
          </div>
          <div className="pdf-viewer__actions">
            {mode === 'pdf' && (
              <a
                className="text-link"
                href={project.pdfViewUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open PDF <Icon name="external" />
              </a>
            )}
            <button
              ref={closeRef}
              className="pdf-viewer__close"
              onClick={onClose}
              aria-label="Close preview"
            >
              <Icon name="close" />
            </button>
          </div>
        </header>
        {mode === 'pdf' ? (
          <>
            <p id="preview-note" className="pdf-viewer__note">
              31 MB PDF · Browse the pages below,{' '}
              <a href={project.pdfViewUrl} target="_blank" rel="noreferrer">
                open the PDF in a new tab
              </a>{' '}
              or <a href={project.download}>download it</a>.
            </p>
            <PdfLoadBoundary>
              <Suspense
                fallback={
                  <p className="pdf-viewer__fallback" role="status">
                    Preparing the planner preview…
                  </p>
                }
              >
                {project.pdfViewUrl && <PdfDocument url={project.pdfViewUrl} />}
              </Suspense>
            </PdfLoadBoundary>
          </>
        ) : (
          <>
            <div className="pdf-viewer__image">
              <img
                src={assetUrl(
                  currentImage.original ?? `${currentImage.image}.png`,
                )}
                width={currentImage.width}
                height={currentImage.height}
                alt={currentImage.imageAlt}
              />
            </div>
            {images.length > 1 && (
              <div
                className="screenshot-navigation"
                aria-label="Screenshot navigation"
              >
                <button
                  onClick={() =>
                    setImageIndex(
                      (index) => (index - 1 + images.length) % images.length,
                    )
                  }
                  aria-label="Previous screenshot"
                >
                  ←
                </button>
                <span role="status">
                  Screenshot {imageIndex + 1} of {images.length}
                </span>
                <button
                  onClick={() =>
                    setImageIndex((index) => (index + 1) % images.length)
                  }
                  aria-label="Next screenshot"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </dialog>
  )
}
