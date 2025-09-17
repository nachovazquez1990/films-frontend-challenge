import { create } from 'zustand'
import type { FilmCard } from '../lib/types'

type WishlistState = {
    items: FilmCard[]
    add: (item: FilmCard) => void
    remove: (id: number) => void
    has: (id: number) => boolean
}

const LS_KEY = 'wishlist.v1'

function load(): FilmCard[] {
    if (typeof window === 'undefined') return []
    try {
        const raw = localStorage.getItem(LS_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export const useWishlist = create<WishlistState>((set, get) => ({
    items: typeof window !== 'undefined' ? load() : [],
    add: (item) =>
        set((s) => {
            if (s.items.some((x) => x.id === item.id)) return s
            const items = [...s.items, item]
            if (typeof window !== 'undefined')
                localStorage.setItem(LS_KEY, JSON.stringify(items))
            return { items }
        }),
    remove: (id) =>
        set((s) => {
            const items = s.items.filter((x) => x.id !== id)
            if (typeof window !== 'undefined')
                localStorage.setItem(LS_KEY, JSON.stringify(items))
            return { items }
        }),
    has: (id) => !!get().items.find((x) => x.id === id),
}))
