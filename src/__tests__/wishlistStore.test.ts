import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useWishlist } from '../../src/state/wishlistStore'
import type { FilmCard } from '../../src/lib/types'

describe('wishlistStore', () => {
  beforeEach(() => {
    const { getState, setState } = useWishlist
    setState({ items: [], add: getState().add, remove: getState().remove, has: getState().has })
    const store: Record<string, string> = {}
    vi.spyOn(window, 'localStorage', 'get').mockReturnValue({
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => { store[k] = v },
      removeItem: (k: string) => { delete store[k] },
      clear: () => { Object.keys(store).forEach(k => delete store[k]) },
      key: (i: number) => Object.keys(store)[i] ?? null,
      get length() { return Object.keys(store).length }
    })
  })

  it('añade y detecta elementos', () => {
    const item: FilmCard = { id: 10, title: 'X', img: 'url' }
    useWishlist.getState().add(item)
    expect(useWishlist.getState().has(10)).toBe(true)
  })

  it('elimina elementos y persiste', () => {
    const item: FilmCard = { id: 10, title: 'X', img: 'url' }
    const s = useWishlist.getState()
    s.add(item)
    s.remove(10)
    expect(useWishlist.getState().has(10)).toBe(false)
    expect(localStorage.getItem('wishlist.v1')).toBe(JSON.stringify([]))
  })
})
