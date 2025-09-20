import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import Card from '../components/Card'

function Wrapper({ children }: { children: ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>
}

test('renderiza Card y linkea al detalle', async () => {
  const film = { id: 1, title: 'Movie', img: '/x.jpg' }
  render(<Card film={film} />, { wrapper: Wrapper })
  const link = screen.getByRole('link', { name: /Movie/ })
  expect(link).toHaveAttribute('href', '/film/1')
})
