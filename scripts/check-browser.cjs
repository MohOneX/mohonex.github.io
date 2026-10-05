// Usage: node scripts/check-browser.cjs <playwright-package> <chromium-executable>
const { chromium } = require(process.argv[2] || 'playwright')
const fs = require('node:fs/promises')
const assert = require('node:assert/strict')
const baseURL = process.argv[4] || 'http://127.0.0.1:5173/'

;(async () => {
  await fs.mkdir('artifacts', { recursive: true })
  const browser = await chromium.launch({
    executablePath: process.argv[3],
    headless: true,
  })
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  })
  const errors = []
  const failedLocal = []
  let pdfRequests = 0
  page.on('request', (request) => {
    if (request.url().endsWith('2026-digital-planner.pdf')) pdfRequests++
  })
  // Some managed Chromium environments replace PDF fetches with empty 204s.
  // Use the server's real HTTP response as a fixture for renderer interaction
  // checks; the file status, MIME type, and PDF signature are checked below.
  if (process.argv.includes('--pdf-fixture'))
    await page.route('**/projects/2026-digital-planner.pdf', async (route) => {
      const response = await page.request.get(route.request().url())
      await route.fulfill({ response })
    })
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (
      response.url().startsWith('http://127.0.0.1') &&
      response.status() >= 400
    )
      failedLocal.push(`${response.status()} ${response.url()}`)
  })
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  assert.equal(await page.locator('h1').count(), 1)
  assert.equal(await page.locator('article.project').count(), 5)
  assert.equal(pdfRequests, 0, 'PDF must not load on initial visit')
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await image.evaluate((image) => image.decode())
  }
  await page.evaluate(() => scrollTo(0, 0))
  await page.screenshot({ path: 'artifacts/desktop.png', fullPage: true })
  for (const width of [1440, 1024, 820, 768, 600, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
      `Overflow at ${width}px`,
    )
    const missingImages = await page
      .locator('img')
      .evaluateAll((images) =>
        images
          .filter((image) => image.complete && !image.naturalWidth)
          .map((image) => image.src),
      )
    assert.deepEqual(missingImages, [])
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.evaluate(() => scrollTo(0, 0))
  await page.screenshot({ path: 'artifacts/mobile.png', fullPage: true })
  const screenshotButton = page.getByRole('button', {
    name: 'Enlarge DentAxis screenshot',
  })
  const vaccineButton = page.getByRole('button', {
    name: 'Enlarge Vaccine Track screenshot 2',
    exact: true,
  })
  await vaccineButton.click()
  await page.getByRole('dialog').waitFor()
  assert.match(
    await page.locator('dialog img').getAttribute('src'),
    /Vaacine Track 2.png/,
  )
  await page
    .getByRole('button', { name: 'Next screenshot', exact: true })
    .click()
  assert.match(
    await page.locator('dialog img').getAttribute('src'),
    /Vaacine Track 3.png/,
  )
  await page.keyboard.press('ArrowRight')
  assert.match(
    await page.locator('dialog img').getAttribute('src'),
    /Vaacine Track 1.png/,
  )
  await page
    .getByRole('button', { name: 'Previous screenshot', exact: true })
    .click()
  assert.match(
    await page.locator('dialog img').getAttribute('src'),
    /Vaacine Track 3.png/,
  )
  await page.keyboard.press('Escape')
  assert.equal(
    await vaccineButton.evaluate((button) => button === document.activeElement),
    true,
  )
  await page
    .getByRole('button', {
      name: 'Enlarge Checkmate Elite screenshot',
      exact: true,
    })
    .click()
  await page.locator('dialog img').evaluate((image) => image.decode())
  assert.match(
    await page.locator('dialog img').getAttribute('src'),
    /Checkmate Elite.jpg/,
  )
  await page.keyboard.press('Escape')
  assert.equal(
    await page.locator('#vaccine-track .btn--download').isDisabled(),
    true,
  )
  assert.equal(
    await page.locator('#checkmate-elite .btn--download').isDisabled(),
    true,
  )
  await page
    .locator('#vaccine-track')
    .screenshot({ path: 'artifacts/vaccine-track-mobile.png' })
  await page
    .locator('#checkmate-elite')
    .screenshot({ path: 'artifacts/checkmate-elite-mobile.png' })
  await screenshotButton.click()
  await page.getByRole('dialog').waitFor()
  assert.equal(
    await page
      .getByRole('button', { name: 'Close preview' })
      .evaluate((button) => button === document.activeElement),
    true,
  )
  await page.keyboard.press('Tab')
  assert.equal(
    await page.evaluate(() => !!document.activeElement.closest('dialog')),
    true,
    'Modal focus must stay inside dialog',
  )
  await page.keyboard.press('Escape')
  assert.equal(await page.getByRole('dialog').count(), 0)
  assert.equal(
    await screenshotButton.evaluate(
      (button) => button === document.activeElement,
    ),
    true,
    'Restore focus to screenshot button',
  )
  await page.locator('#dentaxis summary').click()
  assert.equal(await page.locator('#dentaxis details').getAttribute('open'), '')
  await page.locator('#dentaxis summary').click()
  const preview = page.getByRole('button', { name: 'Preview planner' })
  await preview.click()
  await page.getByRole('dialog').waitFor()
  const pdf = await page.request.get(
    `${baseURL}projects/2026-digital-planner.pdf`,
  )
  assert.equal(pdf.status(), 200)
  assert.match(pdf.headers()['content-type'], /application\/pdf/)
  assert.equal((await pdf.body()).subarray(0, 5).toString(), '%PDF-')
  await page
    .getByRole('img', { name: /Planner page 1 of/ })
    .waitFor({ timeout: 60000 })
  await page.getByRole('button', { name: 'Next page' }).click()
  await page.getByRole('img', { name: /Planner page 2 of/ }).waitFor()
  await page.getByRole('button', { name: 'Previous page' }).click()
  await page.getByRole('img', { name: /Planner page 1 of/ }).waitFor()
  await page.getByRole('spinbutton', { name: 'Page number' }).fill('10')
  await page.getByRole('button', { name: 'Go', exact: true }).click()
  await page.getByRole('img', { name: /Planner page 10 of/ }).waitFor()
  await page.getByRole('button', { name: 'Zoom to 150 percent' }).click()
  await page.waitForFunction(
    () =>
      document.querySelector('.pdf-document__status').textContent ===
      'Page 10 ready',
  )
  assert.equal(
    await page
      .getByRole('button', { name: 'Zoom to 200 percent' })
      .textContent(),
    '150% ＋',
  )
  await page.getByRole('button', { name: 'Zoom to 200 percent' }).click()
  await page.getByRole('button', { name: 'Fit page to width' }).click()
  await page.screenshot({ path: 'artifacts/planner-mobile.png' })
  await page.getByRole('button', { name: 'Close preview' }).click()
  assert.equal(
    await preview.evaluate((button) => button === document.activeElement),
    true,
  )
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Contact' })
    .click()
  await page.waitForFunction(
    () =>
      document
        .querySelector('nav a[href="#contact"]')
        .getAttribute('aria-current') === 'location',
  )
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  await page.locator('.skip-link').waitFor()
  await page.keyboard.press('Tab')
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent),
    'Skip to content',
  )
  assert.deepEqual(errors, [], 'Browser runtime errors')
  assert.deepEqual(failedLocal, [], 'Missing local assets')
  await page.locator('.skip-link').evaluate((element) => element.blur())
  await page.screenshot({ path: 'artifacts/hero-desktop.png' })
  const failurePage = await browser.newPage()
  await failurePage.route('**/projects/2026-digital-planner.pdf', (route) =>
    route.abort(),
  )
  await failurePage.goto(baseURL)
  await failurePage.getByRole('button', { name: 'Preview planner' }).click()
  await failurePage.getByRole('alert').waitFor()
  await failurePage.unroute('**/projects/2026-digital-planner.pdf')
  await failurePage.route(
    '**/projects/2026-digital-planner.pdf',
    async (route) => {
      await route.fulfill({
        response: await failurePage.request.get(route.request().url()),
      })
    },
  )
  await failurePage.getByRole('button', { name: 'Try again' }).click()
  await failurePage.getByRole('img', { name: /Planner page 1 of/ }).waitFor()
  await failurePage.close()
  console.log(
    'PASS: 7 viewport widths; images; lazy PDF; dialogs and focus; Escape; project stories; PDF file, page navigation, jump, zoom, error and retry; active navigation; skip link; zero runtime errors.',
  )
  await browser.close()
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
