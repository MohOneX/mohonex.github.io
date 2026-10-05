import { useEffect, useRef, useState } from 'react'
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
} from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = workerUrl

export default function PdfDocument({ url }: { url: string }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [width, setWidth] = useState(600)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [rendered, setRendered] = useState<{
    pdf: PDFDocumentProxy
    pageNumber: number
    width: number
    zoom: number
  } | null>(null)
  const [attempt, setAttempt] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasHost = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.max(200, Math.floor(entry.contentRect.width - 32))),
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let disposed = false
    const task = getDocument({ url })
    task.onProgress = ({
      loaded,
      total,
    }: {
      loaded: number
      total: number
    }) => {
      if (!disposed && total)
        setProgress(Math.min(100, Math.round((loaded / total) * 100)))
    }
    task.promise
      .then((document) => {
        if (!disposed) setPdf(document)
      })
      .catch(() => {
        if (!disposed)
          setError(
            'The preview couldn’t load. Try again, or use the Open PDF link above.',
          )
      })
    return () => {
      disposed = true
      void task.destroy()
    }
  }, [url, attempt])

  useEffect(() => {
    if (!pdf) return
    let disposed = false
    let cancelRender: (() => void) | undefined
    pdf
      .getPage(pageNumber)
      .then(async (page) => {
        if (disposed) return
        setError('')
        const original = page.getViewport({ scale: 1 })
        const viewport = page.getViewport({
          scale: (width / original.width) * zoom,
        })
        const density = Math.min(window.devicePixelRatio || 1, 2)
        const canvas = document.createElement('canvas')
        canvas.width = Math.floor(viewport.width * density)
        canvas.height = Math.floor(viewport.height * density)
        canvas.style.width = `${Math.floor(viewport.width)}px`
        canvas.style.height = `${Math.floor(viewport.height)}px`
        canvas.setAttribute('role', 'img')
        canvas.setAttribute(
          'aria-label',
          `Planner page ${pageNumber} of ${pdf.numPages}`,
        )
        const task = page.render({
          canvas,
          viewport,
          transform: [density, 0, 0, density, 0, 0],
        })
        cancelRender = () => task.cancel()
        await task.promise
        if (disposed) return
        canvasHost.current?.replaceChildren(canvas)
        if (scrollRef.current) scrollRef.current.scrollTop = 0
        setRendered({ pdf, pageNumber, width, zoom })
      })
      .catch(() => {
        if (!disposed) {
          setError(
            'This page couldn’t render. Try again, or open the original PDF above.',
          )
        }
      })
    return () => {
      disposed = true
      cancelRender?.()
    }
  }, [pdf, pageNumber, width, zoom])

  const rendering =
    rendered?.pdf !== pdf ||
    rendered?.pageNumber !== pageNumber ||
    rendered?.width !== width ||
    rendered?.zoom !== zoom
  const busy = !pdf || rendering
  return (
    <div className="pdf-document">
      <div className="pdf-document__toolbar" aria-label="PDF page controls">
        <button
          disabled={!pdf || pageNumber <= 1 || busy}
          onClick={() => setPageNumber((number) => number - 1)}
          aria-label="Previous page"
        >
          ←
        </button>
        {pdf ? (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const value = Number(
                new FormData(event.currentTarget).get('page'),
              )
              if (Number.isInteger(value))
                setPageNumber(Math.max(1, Math.min(pdf.numPages, value)))
            }}
          >
            <label>
              Page{' '}
              <input
                key={pageNumber}
                name="page"
                type="number"
                min="1"
                max={pdf.numPages}
                defaultValue={pageNumber}
                aria-label="Page number"
                disabled={busy}
              />
            </label>
            <span> of {pdf.numPages}</span>
            <button type="submit" disabled={busy}>
              Go
            </button>
          </form>
        ) : (
          <span>Loading planner</span>
        )}
        <button
          disabled={!pdf || pageNumber >= pdf.numPages || busy}
          onClick={() => setPageNumber((number) => number + 1)}
          aria-label="Next page"
        >
          →
        </button>
        <button
          className="pdf-document__zoom"
          disabled={!pdf || busy}
          onClick={() =>
            setZoom((value) => (value === 1 ? 1.5 : value === 1.5 ? 2 : 1))
          }
          aria-label={
            zoom === 1
              ? 'Zoom to 150 percent'
              : zoom === 1.5
                ? 'Zoom to 200 percent'
                : 'Fit page to width'
          }
        >
          {zoom === 1 ? 'Fit width' : `${zoom * 100}%`}{' '}
          <span aria-hidden="true">＋</span>
        </button>
      </div>
      <div className="pdf-document__status" role="status" aria-live="polite">
        {error
          ? ''
          : !pdf
            ? `Loading PDF… ${progress}%`
            : rendering
              ? `Rendering page ${pageNumber}…`
              : `Page ${pageNumber} ready`}
      </div>
      <div
        ref={scrollRef}
        className="pdf-document__scroll"
        aria-busy={busy && !error}
      >
        {error ? (
          <div className="pdf-viewer__fallback">
            <p role="alert">{error}</p>
            <button
              className="btn btn--primary"
              onClick={() => {
                setPdf(null)
                setError('')
                setProgress(0)
                setRendered(null)
                setAttempt((value) => value + 1)
              }}
            >
              Try again
            </button>
          </div>
        ) : (
          <div ref={canvasHost} className="pdf-document__canvas" />
        )}
      </div>
    </div>
  )
}
