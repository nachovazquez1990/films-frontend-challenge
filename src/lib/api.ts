// src/lib/api.ts
import type {
    FilmCard,
    ApiListResponse,
    TMDBMovieListItem,
    TMDBMovieDetail,
} from './types'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string

function q(params: Record<string, string | number | undefined>) {
    const usp = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null) usp.set(k, String(v))
    }
    return usp.toString()
}

export function imageUrl(
    path?: string | null,
    size: 'w300' | 'w500' | 'original' = 'w500'
) {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : ''
}

export const GENRES = { adventure: 12, history: 36, animation: 16 } as const
export type Category = keyof typeof GENRES

export async function fetchMoviesByGenre(genreId: number): Promise<FilmCard[]> {
    const url = `${BASE_URL}/discover/movie?${q({
        api_key: API_KEY,
        with_genres: genreId,
        sort_by: 'popularity.desc',
        language: 'en-US',
        page: 1,
    })}`

    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed fetching movies')

    const data = (await res.json()) as ApiListResponse<TMDBMovieListItem>

    return data.results.map((m) => ({
        id: m.id,
        title: m.title ?? m.name ?? 'Untitled',
        img: imageUrl(m.poster_path, 'w300'),
    }))
}

export async function fetchMovieDetail(id: string | number): Promise<TMDBMovieDetail> {
    const url = `${BASE_URL}/movie/${id}?${q({
        api_key: API_KEY,
        language: 'en-US',
    })}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed fetching movie')

    const detail = (await res.json()) as TMDBMovieDetail
    return detail
}
