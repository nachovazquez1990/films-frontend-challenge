import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import * as api from '../lib/api'

describe('api helpers', () => {
  beforeEach(() => {
    const fetchMock: Mock = vi.fn()
    vi.stubGlobal('fetch', fetchMock as unknown as typeof fetch)
  })

  it('imageUrl construye la URL completa', () => {
    expect(api.imageUrl('/path.jpg')).toContain('/path.jpg')
    expect(api.imageUrl(null)).toBeUndefined()
  })

  it('fetchMoviesByGenre usa el endpoint correcto', async () => {
    const mockRes = {
      ok: true,
      json: async () => ({ results: [{ id: 1, title: 'A', poster_path: '/a.jpg' }] }),
    }

    const fetchMock = globalThis.fetch as unknown as Mock
    fetchMock.mockResolvedValueOnce(mockRes as unknown as Response)

    const list = await api.fetchMoviesByGenre('adventure')
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/tmdb\/discover\/movie/)
    )
    expect(list[0]).toEqual({
      id: 1,
      title: 'A',
      img: expect.stringContaining('/a.jpg'),
    })
  })
})
