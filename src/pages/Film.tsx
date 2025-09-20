import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import type { FilmCard, TMDBMovieDetail } from '../lib/types'
import { fetchMovieDetail, imageUrl } from '../lib/api'
import { useWishlist } from '../state/wishlistStore'
import '../styles/pages/film.scss'

export default function Film() {
    const { id } = useParams()
    const [sp] = useSearchParams()
    const category = (sp.get('category') ?? 'adventure') as
        | 'adventure'
        | 'history'
        | 'animation'

    const location = useLocation()
    const filmFromState = (location.state as { film?: FilmCard } | null)?.film

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [detail, setDetail] = useState<TMDBMovieDetail | null>(null)

    const [hydrated, setHydrated] = useState(false)
    useEffect(() => {
        setHydrated(true)
    }, [])

    const movieId = Number(id)
    const hasValidId = Number.isFinite(movieId)

    const add = useWishlist((s) => s.add)
    const remove = useWishlist((s) => s.remove)

    const inWishlist = useWishlist((s) =>
        hasValidId ? s.items.some((x) => x.id === movieId) : false
    )

    useEffect(() => {
        if (!id) {
            setLoading(false)
            setError('Missing film id')
            return
        }
        let cancelled = false
            ; (async () => {
                try {
                    setLoading(true)
                    setError(null)
                    const d = await fetchMovieDetail(id)
                    if (!cancelled) setDetail(d)
                } catch (e: unknown) {
                    if (!cancelled) {
                        setError(e instanceof Error ? e.message : 'Error loading film')
                    }
                } finally {
                    if (!cancelled) setLoading(false)
                }
            })()
        return () => {
            cancelled = true
        }
    }, [id])

    const title = detail?.title ?? filmFromState?.title ?? (id ? 'Loading…' : 'Film')
    const poster = imageUrl(detail?.poster_path) ?? filmFromState?.img
    const overview = detail?.overview ?? 'No overview available.'
    const tagline = detail?.tagline ?? null

    return (
        <div className={`film film--${category}`}>
            <div className="film__media">
                {hydrated && poster ? (
                    <img src={poster} alt={title} />
                ) : (
                    <div className="placeholder">No image</div>
                )}
            </div>
            <div className="film__content">
                {loading && <div className="loading">Loading…</div>}
                {error && <div className="error">{error}</div>}

                <div>
                    <h2 className="film__title">{title}</h2>
                    <h3 className="film__category">{category}</h3>
                </div>

                {tagline && <p className="film__tagline">“{tagline}”</p>}
                <div className="film__overview">
                    <p>{overview}</p>
                </div>

                {hasValidId && (
                    <div className="film__actions">
                        {!inWishlist ? (
                            <button
                                className="btn"
                                onClick={() => add({ id: movieId, title, img: poster })}
                            >
                                Add to wishlist
                            </button>
                        ) : (
                            <button
                                className="btn--remove"
                                onClick={() => remove(movieId)}
                            >
                                Remove from wishlist
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
