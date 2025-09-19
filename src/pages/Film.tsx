import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import type { FilmCard, TMDBMovieDetail } from '../lib/types'
import { fetchMovieDetail, imageUrl } from '../lib/api'
import { useWishlist } from '../state/wishlistStore'
import '../styles/components/film.scss'

export default function Film() {
    const { id } = useParams()
    const [sp] = useSearchParams()
    const category = (sp.get('category') ?? 'adventure') as 'adventure' | 'history' | 'animation'

    const location = useLocation()
    const filmFromState = (location.state as { film?: FilmCard })?.film

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [detail, setDetail] = useState<TMDBMovieDetail | null>(null)

    const add = useWishlist((s) => s.add)
    const remove = useWishlist((s) => s.remove)
    const has = useWishlist((s) => s.has)

    useEffect(() => {
        if (!id) return
        let cancelled = false
            ; (async () => {
                try {
                    setLoading(true)
                    setError(null)
                    const d = await fetchMovieDetail(id)
                    if (!cancelled) setDetail(d)
                } catch (e: unknown) {
                    if (!cancelled) {
                        if (e instanceof Error) {
                            setError(e.message)
                        } else {
                            setError('Error loading movies')
                        }
                    }
                }
                finally {
                    if (!cancelled) setLoading(false)
                }
            })()
        return () => {
            cancelled = true
        }
    }, [id])

    const title = detail?.title ?? filmFromState?.title ?? '…'
    const poster = imageUrl(detail?.poster_path) ?? filmFromState?.img
    const overview = detail?.overview ?? 'No overview available.'
    const tagline = detail?.tagline ?? null
    const inWishlist = has(Number(id))

    return (
        <div className={`film film--${category}`}>
            <div className="film__media">
                {poster ? <img src={poster} alt={title} /> : <div className="placeholder">No image</div>}
            </div>
            <div className="film__content">
                {loading && <div className="loading">Loading…</div>}
                {error && <div className="error">{error}</div>}
                <h2 className="film__title">{title}</h2>
                {tagline && <p className="film__tagline">“{tagline}”</p>}
                <div className="film__overview">
                    <p>{overview}</p>
                </div>
                <div className="film__actions">
                    {!inWishlist ? (
                        <button
                            className="btn btn--primary"
                            onClick={() => add({ id: Number(id), title, img: poster })}
                        >
                            Add to wishlist
                        </button>
                    ) : (
                        <button className="btn btn--danger" onClick={() => remove(Number(id))}>
                            Remove from wishlist
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
