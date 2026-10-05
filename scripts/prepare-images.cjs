// Usage: node scripts/prepare-images.cjs <path-to-sharp-package>
// Keep original PNG screenshots for the full-resolution preview.
const sharp = require(process.argv[2] || 'sharp')
const path = require('node:path')
const fs = require('node:fs/promises')
const root = path.resolve(__dirname, '..')

;(async () => {
  const screenshots = [
    ['dentaxis', 'dentaxis.png'],
    ['pdf-control', 'pdf-control.png'],
    ['digital-planner', 'digital-planner.png'],
    ['vaccine-track-1', 'Vaacine Track 1.png'],
    ['vaccine-track-2', 'Vaacine Track 2.png'],
    ['vaccine-track-3', 'Vaacine Track 3.png'],
    ['checkmate-elite', 'Checkmate Elite.jpg'],
  ]
  for (const [name, original] of screenshots) {
    for (const width of [800, 1600]) {
      const result = await sharp(path.join(root, 'public/projects', original))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 86 })
        .toFile(path.join(root, 'public/projects', `${name}-${width}.webp`))
      console.log(`${name}-${width}.webp: ${Math.round(result.size / 1024)} KB`)
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f8f9f5"/>
  <rect x="810" width="390" height="630" fill="#173c39"/>
  <circle cx="1055" cy="310" r="180" fill="none" stroke="#41695b"/>
  <circle cx="1055" cy="310" r="125" fill="none" stroke="#41695b"/>
  <circle cx="1055" cy="310" r="70" fill="#c4d7aa"/>
  <g font-family="Segoe UI, Arial, sans-serif">
  <text x="70" y="100" font-size="48" font-weight="700" fill="#182a2c">moh<tspan fill="#23766b">.</tspan></text>
  <text x="70" y="250" font-size="70" font-weight="600" letter-spacing="-3" fill="#182a2c">Useful software.</text>
  <text x="70" y="340" font-size="70" font-weight="600" letter-spacing="-3" fill="#23766b">Thoughtfully built.</text>
  <text x="74" y="411" font-size="22" fill="#5e6c6c">Apps, games &amp; digital products by Moh.</text>
  <path d="M70 485h665" stroke="#dbe2dc"/>
  <text x="74" y="540" font-size="18" fill="#182a2c">Windows  /  Android  /  Digital products</text>
  <text x="851" y="555" font-size="17" fill="#c5d9cd">mohonex.github.io</text>
  </g></svg>`
  await fs.writeFile(path.join(root, 'public/social-preview.svg'), svg)
  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(root, 'public/social-preview.png'))
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
