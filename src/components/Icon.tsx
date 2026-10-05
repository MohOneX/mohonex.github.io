type IconProps = {
  name?: 'arrow' | 'external' | 'download' | 'plus' | 'close'
  className?: string
}

export function Icon({ name = 'arrow', className = '' }: IconProps) {
  const paths = {
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    external: 'M6 18 18 6M6 6h12v12',
    download: 'M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4',
    plus: 'M5 12h14M12 5v14',
    close: 'm6 6 12 12M6 18 18 6',
  }
  return (
    <svg
      className={`icon ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
