export type ProjectScreenshot = {
  image: string
  original?: string
  imageAlt: string
  width: number
  height: number
}

export type Project = ProjectScreenshot & {
  id: string
  name: string
  category: string
  headline: string
  outcome: string
  tags: string[]
  screenshots?: ProjectScreenshot[]
  href?: string
  pdfViewUrl?: string
  download?: string
  downloadLabel?: string
  downloadMeta?: string
  challenge: string
  contribution: string
  result: string
  features: string[]
}

export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const projects: Project[] = [
  {
    id: 'dentaxis',
    name: 'DentAxis',
    category: 'Clinic management software',
    headline: 'A clearer view of the whole clinic.',
    outcome:
      'Appointments, patient records, and daily operations. One Windows workspace that brings the moving parts of a dental practice together.',
    tags: ['Windows app', 'Healthcare'],
    image: 'projects/dentaxis',
    imageAlt:
      'DentAxis dashboard with patient records, appointments, clinical charting, and practice reports.',
    width: 2560,
    height: 1375,
    href: 'https://mohonex.github.io/DentAxis-Releases/',
    download:
      'https://github.com/MohOneX/DentAxis-Releases/releases/download/v3.3.1/DentAxis-Setup-3.3.1.exe',
    downloadLabel: 'Download for Windows',
    downloadMeta: 'v3.3.1 · Windows 64-bit · 89 MB',
    challenge:
      'A dental practice needs to keep clinical work and day-to-day administration connected. Patient information should be easy to find alongside appointments and treatments.',
    contribution:
      'I built a desktop application that brings patient records, scheduling, clinical charting, and practice management into a shared workspace.',
    result:
      'A central dashboard connects the clinical and administrative parts of the practice, with English and Arabic interface options.',
    features: [
      'Patient records & appointments',
      '3D clinical charting',
      'Billing & practice reports',
    ],
  },
  {
    id: 'pdf-control',
    name: 'PDF-Control',
    category: 'Document productivity',
    headline: 'Less file friction. More control.',
    outcome:
      'An everyday desktop toolkit for merging, compressing, signing, and converting PDF documents in one place.',
    tags: ['Windows app', 'PDF tools'],
    image: 'projects/pdf-control',
    imageAlt:
      'PDF-Control desktop interface with tools for merging, compressing, signing, and converting documents.',
    width: 2560,
    height: 1375,
    href: 'https://github.com/MohOneX/PDF-Control',
    download:
      'https://github.com/MohOneX/PDF-Control/releases/download/v3.0.2/PDF-Control-3.0.2-windows-x64-setup.exe',
    downloadLabel: 'Download for Windows',
    downloadMeta: 'v3.0.2 · Windows 64-bit · 304 MB',
    challenge:
      'Working with PDFs often means switching between tools for small, repetitive tasks. The goal was to bring those everyday operations together.',
    contribution:
      'I built a desktop document workspace with a PDF library and grouped tools for editing, conversion, signing, and document protection.',
    result:
      'Common document tasks share one interface, with English and Arabic language options and direct access to frequently used tools.',
    features: [
      'Merge, compress & convert',
      'Signing & document tools',
      'English & Arabic interface',
    ],
  },
  {
    id: 'digital-planner',
    name: 'Digital Planner',
    category: 'Digital product · 2026 edition',
    headline: 'Make room for what matters.',
    outcome:
      'A colorful, year-long planner for goals, schedules, and the details of everyday life. Use it digitally or make it your own on paper.',
    tags: ['Digital & printable', 'PDF planner'],
    image: 'projects/digital-planner',
    imageAlt:
      'Digital Planner index showing monthly planning, personal goals, work, education, and budget sections.',
    width: 1162,
    height: 843,
    pdfViewUrl: assetUrl('projects/2026-digital-planner.pdf'),
    download:
      'https://github.com/MohOneX/digital-planner/releases/download/v1.0.0/2026.Colored.Digital-Planner.pdf',
    downloadLabel: 'Download planner',
    downloadMeta: '2026 edition · PDF · 31 MB',
    challenge:
      'Plans span more than a calendar. Goals, routines, work, and personal commitments all need a place without becoming another complicated system.',
    contribution:
      'I designed a year-long PDF with a visual index, monthly sections, and dedicated templates for different areas of daily life.',
    result:
      'A collection of planning pages for digital use or printing, covering everything from daily notes to longer-term goals.',
    features: [
      'Monthly & yearly planning',
      'Goals, habits & daily notes',
      'Work, study & budget templates',
    ],
  },
  {
    id: 'vaccine-track',
    name: 'Vaccine Track',
    downloadLabel: 'Download for Android',
    downloadMeta: 'Coming soon · Android',
    category: 'Android app · Vaccination tracking',
    headline: 'Every dose, clearly recorded.',
    outcome:
      'An Android app for recording vaccine shots, tracking opened vials, and reviewing dose totals in a clear Arabic interface.',
    tags: ['Android app', 'Healthcare'],
    image: 'projects/vaccine-track-1',
    original: 'projects/Vaacine Track 1.png',
    imageAlt:
      'Vaccine Track Arabic dashboard with monthly dose totals by vaccine and a wastage report.',
    width: 585,
    height: 1234,
    screenshots: [
      {
        image: 'projects/vaccine-track-1',
        original: 'projects/Vaacine Track 1.png',
        imageAlt:
          'Vaccine Track monthly summary showing dose totals and vaccine wastage.',
        width: 585,
        height: 1234,
      },
      {
        image: 'projects/vaccine-track-2',
        original: 'projects/Vaacine Track 2.png',
        imageAlt:
          'Vaccine Track vial management screen with vial sizes and a session summary.',
        width: 585,
        height: 991,
      },
      {
        image: 'projects/vaccine-track-3',
        original: 'projects/Vaacine Track 3.png',
        imageAlt:
          'Vaccine Track daily entry screen with dose counters grouped by vaccination visit.',
        width: 585,
        height: 1036,
      },
    ],
    challenge:
      'Vaccination records involve daily entries, different vaccine types, and vial usage. Keeping those details organized makes them easier to review.',
    contribution:
      'I built an Android app with dose-entry counters, vial tracking, and monthly summaries in an Arabic interface.',
    result:
      'Daily entries and summary views bring vaccine-shot tracking into one mobile workspace.',
    features: [
      'Daily vaccine-shot records',
      'Vial usage & dose summaries',
      'Arabic mobile interface',
    ],
  },
  {
    id: 'checkmate-elite',
    name: 'Checkmate Elite',
    href: 'https://github.com/MohOneX/checkmate-elite',
    downloadLabel: 'Download for Windows',
    downloadMeta: 'Coming soon · Windows',
    category: 'Windows desktop game · Chess',
    headline: 'A place for your next move.',
    outcome:
      'A chess game for Windows, with a focused board, quick-play time controls, and a dashboard for recent games and player progress.',
    tags: ['Windows game', 'Chess'],
    image: 'projects/checkmate-elite',
    original: 'projects/Checkmate Elite.jpg',
    imageAlt:
      'Checkmate Elite Windows chess dashboard with a chessboard, bullet, blitz, and rapid options, and player progress.',
    width: 2560,
    height: 1353,
    challenge:
      'A desktop chess experience needs to keep the board central while making it easy to choose a game and return to recent activity.',
    contribution:
      'I built a Windows chess game with a dark interface, quick-play options, and a dashboard that brings the board and player activity together.',
    result:
      'A dedicated desktop home for chess, with a charcoal-and-gold interface and clear paths into the next game.',
    features: [
      'Windows desktop chess',
      'Bullet, blitz & rapid options',
      'Recent games & progress dashboard',
    ],
  },
]

export const site = {
  name: 'Moh',
  role: 'Software developer & digital product builder',
  tagline:
    'I build apps, games, and digital tools with a focus on clarity and everyday use.',
  philosophy: 'Keep it simple. Make it work. Improve it.',
  github: 'https://github.com/MohOneX',
  linkedin: 'https://www.linkedin.com/in/moh-adnan',
  whatsapp: 'https://wa.me/9647807461533',
  email: '',
}
