import { test, expect } from '@playwright/test'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const fx = async (name: string) =>
  readFile(path.join(__dirname, '..', 'fixtures', name), 'utf-8')

test('Wishlist persiste tras recargar', async ({ page }) => {
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

  await page.goto('/')

  await page.waitForSelector('a[href^="/film/"]')
  const firstCard = page.locator('a[href^="/film/"]').first()
  await firstCard.click()
  await expect(page).toHaveURL(/\/film\/\d+/)

  const addBtn = page.getByRole('button', { name: /add to wishlist/i })
  await addBtn.click()

  await page.goto('/wishlist')
  await expect(page.getByText(/Movie One|Movie|Película|Film/i)).toBeVisible()

  await page.reload()
  await expect(page.getByText(/Movie One|Movie|Película|Film/i)).toBeVisible()
})
