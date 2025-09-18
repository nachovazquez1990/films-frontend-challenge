export type FilmCard = {
    id: number
    title: string
    img?: string
}

export type TMDBMovieListItem = {
    id: number
    title?: string
    name?: string
    poster_path?: string | null
}

export type TMDBMovieDetail = {
    id: number
    title: string
    overview?: string
    poster_path?: string | null
    tagline?: string | null
    genres?: { id: number; name: string }[]
}

export type ApiListResponse<T> = {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}
