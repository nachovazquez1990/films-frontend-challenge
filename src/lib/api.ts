import type {
    FilmCard,
    ApiListResponse,
    TMDBMovieListItem,
    TMDBMovieDetail,
} from './types'

const BASE_URL = '/api/tmdb'

export const GENRES = {
    adventure: 12,
    history: 36,
    animation: 16,
} as const

export function imageUrl(
    path?: string | null,
    size: 'w342' | 'w500' | 'w780' | 'original' = 'w500'
) {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined
}

function q(params: Record<string, string | number | undefined>) {
    const usp = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null) usp.set(k, String(v))
    }
    return usp.toString()
}

export async function fetchMoviesByGenre(
    genre: keyof typeof GENRES,
    page = 1
): Promise<FilmCard[]> {
    const url = `${BASE_URL}/discover/movie?${q({
        with_genres: GENRES[genre],
        page,
        sort_by: 'popularity.desc',
        include_adult: 0,
        language: 'en-US',
    })}`

    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed fetching movies')

    const data = (await res.json()) as ApiListResponse<TMDBMovieListItem>
    return data.results.map((m) => ({
        id: m.id,
        title: m.title ?? m.name ?? 'Untitled',
        img: imageUrl(m.poster_path),
    }))
}

export async function fetchMovieDetail(id: string | number): Promise<TMDBMovieDetail> {
    const url = `${BASE_URL}/movie/${id}?${q({ language: 'en-US' })}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed fetching movie')
    return (await res.json()) as TMDBMovieDetail
}
