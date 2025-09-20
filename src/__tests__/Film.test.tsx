import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi, beforeAll, afterAll } from 'vitest'
import Film from '../pages/Film'

const mockResponse = {
  ok: true,
  json: async () => ({
    id: 1,
    title: 'Movie One',
    poster_path: '/p1.jpg',
    genres: [{ id: 12, name: 'Adventure' }],
  }),
} as const

beforeAll(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve(mockResponse as unknown as Response)) as unknown as typeof fetch
  )
})

afterAll(() => {
  vi.unstubAllGlobals()
})

test('Film carga detalle y muestra título', async () => {
  render(
    <MemoryRouter initialEntries={['/film/1?category=adventure']}>
      <Routes>
        <Route path="/film/:id" element={<Film />} />
      </Routes>
    </MemoryRouter>
  )
  expect(await screen.findByText(/Movie One/)).toBeInTheDocument()
})
