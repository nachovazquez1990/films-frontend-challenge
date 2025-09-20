import { test, expect } from '@playwright/test'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const fx = async (name: string) =>
  readFile(path.join(__dirname, '..', 'fixtures', name), 'utf-8')

test('Home muestra carruseles y navega al detalle', async ({ page }) => {
  // Mock de endpoints TMDB
  await page.route(/\/api\/tmdb\/discover\/movie.*/, async route => {
    const body = await fx('tmdb-list.json')
    await route.fulfill({ status: 200, body, headers: { 'content-type': 'application/json' } })
  })
  await page.route(/\/api\/tmdb\/trending.*/, async route => {
    const body = await fx('tmdb-list.json')
    await route.fulfill({ status: 200, body, headers: { 'content-type': 'application/json' } })
  })
  await page.route(/\/api\/tmdb\/movie\/\d+.*/, async route => {
    const body = await fx('tmdb-detail.json')
    await route.fulfill({ status: 200, body, headers: { 'content-type': 'application/json' } })
  })

  // Abre Home (usa baseURL de la config)
  await page.goto('/')

  // Asegura que el carrusel se ha renderizado
  await expect(page.getByText('Adventure')).toBeVisible()

  // Selecciona la primera tarjeta dentro del carrusel
  const firstCard = page.locator('.carousel-items a[href^="/film/"]').first()

  // Robustez extra para Firefox:
  await firstCard.scrollIntoViewIfNeeded()
  await expect(firstCard).toBeVisible()

  // Haz el click mientras esperas la navegación (evita condiciones de carrera)
  await Promise.all([
    page.waitForURL(/\/film\/\d+/),
    // force:true evita posibles overlays (p.ej., botones del carrusel)
    firstCard.click({ force: true }),
  ])

  // Verifica que cargó el detalle
  await expect(page.getByRole('heading', { name: /Movie One/i })).toBeVisible()
})
